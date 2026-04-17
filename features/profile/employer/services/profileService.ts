const API_URL = process.env.NEXT_PUBLIC_API_URL

const EMPLOYER_PROFILE_URL    = `${API_URL}/profiles/employer/me`
const EMPLOYER_COLLECTION_URL = `${API_URL}/profiles/employer`

const getServiceHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token") ?? ""

  return {
    Authorization: `Bearer ${token}`
  }
}

export interface EmployerProfileResponse {
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
// UPDATE PROFILE (CORRECTO)
// =========================
export const updateEmployerProfile = async (
  profileData: EmployerProfileUpdateData
): Promise<EmployerProfileResponse> => {

  const formData = new FormData()

  //  Construimos el JSON que el backend espera en @RequestPart("data")
  const profileJson = {
    employerName: profileData.employerName,
    businessName: profileData.businessName,
    businessAddress: profileData.businessAddress,
    contactNumber: profileData.contactNumber,
    businessSummary: profileData.businessSummary
  }

  //  ESTA ES LA CLAVE (RequestPart "data")
  formData.append(
    "data",
    new Blob([JSON.stringify(profileJson)], { type: "application/json" })
  )

  // Imagen opcional
  if (profileData.imageFile) {
    formData.append("image", profileData.imageFile)
  }

  // DEBUG (puedes quitarlo después)
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1])
  }

  const res = await fetch(EMPLOYER_PROFILE_URL, {
    method: "PATCH",
    headers: {
      ...getServiceHeaders()
      //  NO poner Content-Type
    },
    body: formData
  })

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