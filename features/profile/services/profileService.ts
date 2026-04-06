const API_URL = process.env.NEXT_PUBLIC_API_URL


const EMPLOYER_PROFILE_URL    = `${API_URL}/profiles/employer/me`
const EMPLOYER_COLLECTION_URL = `${API_URL}/profiles/employer`


const getServiceHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token") ?? ""
  
  return {
    "Authorization": `Bearer ${token}`
  }
}


export interface EmployerProfileResponse {
  employerId?:        string
  userId?:            string
  employerName?:      string   
  businessName?:      string   
  businessAddress?:   string   
  contactNumber?:     string   
  businessSummary?:   string  
  verificationStatus?: boolean
  imageUrl?:          string   
}


export interface EmployerProfileUpdateData {
  employerName?:    string
  businessName?:    string
  businessAddress?: string
  contactNumber?:   string
  businessSummary?: string
  imageFile?:       File    
}


export const getEmployerProfile = async (): Promise<EmployerProfileResponse | null> => {
  const res = await fetch(EMPLOYER_PROFILE_URL, {
    headers: getServiceHeaders()
  })

  if (res.status === 404) return null  

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Error al obtener el perfil")

  return data.data ?? data
}


// Función auxiliar para extraer el ID del Token si localStorage está vacío
const getUserIdFromToken = (token: string): string => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payload = JSON.parse(jsonPayload);
    return payload.sub || payload.userId || payload.id || "";
  } catch (e) {
    return "";
  }
};


export const updateEmployerProfile = async (
  profileData: EmployerProfileUpdateData
): Promise<EmployerProfileResponse> => {
  const formData = new FormData()

  // Capturamos los IDs disponibles (con fallback al token)
  const token = localStorage.getItem("token") || ""
  let userId = localStorage.getItem("user_id") || ""
  
  if (!userId && token) {
    userId = getUserIdFromToken(token)
    if (userId) localStorage.setItem("user_id", userId)
  }

  const employerId = localStorage.getItem("employer_id") || userId 

  console.log("🔍 IDs Detectados (LocalStorage + Token):", { userId, employerId })

  if (!employerId) {
    console.error(" ERROR CRÍTICO: No se encontró USER_ID ni EMPLOYER_ID. El guardado fallará.")
  }

  // Convertimos los datos a un JSON para la parte 'data' del multipart
  const profileJson: any = {
    employerId:      employerId, // ID para mapear el perfil
    nombre:          profileData.employerName    ?? "",
    nombreEmpresa:   profileData.businessName    ?? "",
    direccion:       profileData.businessAddress ?? "",
    telefono:        profileData.contactNumber   ?? "",
    descripcion:     profileData.businessSummary ?? ""
  }

  const dataBlob = new Blob([JSON.stringify(profileJson)], { type: 'application/json' })
  formData.append("data", dataBlob)

  if (profileData.imageFile) {
    formData.append("image", profileData.imageFile)
  }

  const headers = getServiceHeaders() 
  
  // 1. Intentamos actualizar (PATCH /me)
  let res = await fetch(EMPLOYER_PROFILE_URL, {
    method: "PATCH",
    headers,
    body: formData
  })

  // 2. SECUENCIA AGRESIVA DE CREACIÓN
  if (!res.ok) {
    console.warn(`PATCH /me falló (${res.status}). Probando secuencia de creación...`)

    // Intento A: POST /me 
    res = await fetch(EMPLOYER_PROFILE_URL, {
      method: "POST",
      headers,
      body: formData
    })

    // Intento B: Colección base
    if (!res.ok) {
      console.warn(`Intento A falló (${res.status}). Probando Intento B (Colección base)...`)
      res = await fetch(EMPLOYER_COLLECTION_URL, {
        method: "POST",
        headers,
        body: formData
      })
    }

    // Intento C: POST con ID en URL
    if (!res.ok && employerId) {
      console.warn(`Intento B falló (${res.status}). Probando Intento C (POST con ID: ${employerId})...`)
      res = await fetch(`${EMPLOYER_COLLECTION_URL}/${employerId}`, {
        method: "POST",
        headers,
        body: formData
      })
    }

    // Intento D: PUT /me (Creación vía actualización forzada)
    if (!res.ok) {
      console.warn(`Intento C falló (${res.status}). Probando Intento D (PUT /me)...`)
      res = await fetch(EMPLOYER_PROFILE_URL, {
        method: "PUT", 
        headers,
        body: formData
      })
    }

    // Intento E: PUT con ID en URL
    if (!res.ok && employerId) {
      console.warn(`Intento D falló (${res.status}). Probando Intento E (PUT con ID: ${employerId})...`)
      res = await fetch(`${EMPLOYER_COLLECTION_URL}/${employerId}`, {
        method: "PUT",
        headers,
        body: formData
      })
    }
  }

  if (!res.ok) {
    let finalErrorDetail = ""
    try {
      const errorData = await res.json()
      finalErrorDetail = JSON.stringify(errorData)
    } catch {
      finalErrorDetail = await res.text()
    }

    console.error("Error al guardar perfil (PATCH/POST):", {
      status: res.status,
      statusText: res.statusText,
      detail: finalErrorDetail
    })
    
    throw new Error(finalErrorDetail || `Error ${res.status}: ${res.statusText}`)
  }

  const data = await res.json()
  return data.data ?? data
}