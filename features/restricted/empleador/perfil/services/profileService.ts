const API_URL = process.env.NEXT_PUBLIC_API_URL

// =========================
// ENDPOINTS
// =========================
const EMPLOYER_PROFILE_URL = `${API_URL}/profiles/employer/me`
const EMPLOYER_CREATE_URL  = `${API_URL}/profiles/employer/info`

// =========================
// HEADERS
// =========================
const getServiceHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token") ?? ""

  return {
    Authorization: `Bearer ${token}`
    // NO agregar Content-Type aquí cuando usas FormData
  }
}

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const decoded = JSON.parse(jsonPayload)
    return decoded.userId || decoded.setId || decoded.user_id || decoded.id || decoded.sub || null
  } catch (e) {
    return null
  }
}

// =========================
// TYPES
// =========================
export interface EmployerProfileResponse {
  id?: string
  employerId?: string
  employer_id?: string
  userId?: string
  user_id?: string
  employerName?: string
  employer_name?: string
  businessName?: string
  business_name?: string
  businessAddress?: string
  business_address?: string
  contactNumber?: string
  contact_number?: string
  businessSummary?: string
  business_summary?: string
  verificationStatus?: boolean
  verification_status?: boolean
  imageUrl?: string
  image_url?: string
}

export interface EmployerProfileUpdateData {
  employerId?: string | null
  userId?: string | null
  employerName?: string
  businessName?: string
  businessAddress?: string
  contactNumber?: string
  businessSummary?: string
  imageFile?: File
}

// =========================
// GET PROFILE
// =========================
export const getEmployerProfile = async (): Promise<EmployerProfileResponse | null> => {
  const res = await fetch(EMPLOYER_PROFILE_URL, {
    headers: getServiceHeaders()
  })

  if (res.status === 404) return null

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Sesión expirada. Por favor, vuelve a iniciar sesión.")
    }

    const errorText = await res.text().catch(() => "Error desconocido")
    throw new Error(`Error ${res.status}: ${errorText}`)
  }

  const data = await res.json()
  return data.data ?? data
}

// =========================
// CREATE / UPDATE PROFILE
// =========================
export const updateEmployerProfile = async (
  profileData: EmployerProfileUpdateData
): Promise<EmployerProfileResponse> => {

  const profileJson: any = {
    // Camel case
    employerName: profileData.employerName,
    businessName: profileData.businessName,
    businessAddress: profileData.businessAddress,
    contactNumber: profileData.contactNumber,
    businessSummary: profileData.businessSummary,
    // Snake case (garantiza que el backend lo reciba si usa PropertyNamingStrategy.SNAKE_CASE)
    employer_name: profileData.employerName,
    business_name: profileData.businessName,
    business_address: profileData.businessAddress,
    contact_number: profileData.contactNumber,
    business_summary: profileData.businessSummary
  }

  const tokenUserId = getUserIdFromToken()
  const finalUserId = profileData.userId || tokenUserId

  if (profileData.employerId) {
    profileJson.employerId = profileData.employerId
    profileJson.employer_id = profileData.employerId
  }
  if (finalUserId) {
    profileJson.userId = finalUserId
    profileJson.user_id = finalUserId
    profileJson.id = finalUserId // por si acaso
  }

  const formData = new FormData()
  // JSON como archivo (requerido por backend Spring para PATCH multipart)
  formData.append(
    "data",
    new Blob([JSON.stringify(profileJson)], {
      type: "application/json"
    }),
    "data.json"
  )

  // Imagen opcional
  if (profileData.imageFile) {
    formData.append("image", profileData.imageFile)
  }

  // DEBUG
  for (let pair of formData.entries()) {
    console.log("PATCH form data:", pair[0], pair[1])
  }

  // 1. Intentar actualizar (PATCH)
  let res = await fetch(EMPLOYER_PROFILE_URL, {
    method: "PATCH",
    headers: getServiceHeaders(),
    body: formData
  })

  // 2. Si no existe (404) → crear primero (POST) y si hay imagen hacer PATCH
  if (res.status === 404) {
    console.log("Perfil no encontrado, creando con POST /info en JSON...")
    res = await fetch(EMPLOYER_CREATE_URL, {
      method: "POST",
      headers: {
        ...getServiceHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profileJson)
    })

    // Si hubo error al crear en el POST, lo capturamos
    if (!res.ok) {
      let errorDetail = ""
      try {
        const err = await res.json()
        errorDetail = JSON.stringify(err)
      } catch {
        errorDetail = await res.text()
      }
      console.error("Error al crear perfil (POST):", errorDetail)
      throw new Error(errorDetail || `Error POST ${res.status}`)
    }

    // Si se creó correctamente y el usuario había subido una imagen, 
    // necesitamos enviar el FormData en un PATCH para subir la imagen.
    if (profileData.imageFile) {
      console.log("Perfil creado, realizando PATCH subiendo la imagen...")
      res = await fetch(EMPLOYER_PROFILE_URL, {
        method: "PATCH",
        headers: getServiceHeaders(),
        body: formData
      })
    }
  }

  // Manejo de errores final
  if (!res.ok) {
    let errorDetail = ""

    try {
      const err = await res.json()
      errorDetail = JSON.stringify(err)
    } catch {
      errorDetail = await res.text()
    }

    console.error("Error al guardar perfil:", errorDetail)
    throw new Error(errorDetail || `Error ${res.status}`)
  }

  const data = await res.json()
  return data.data ?? data
}