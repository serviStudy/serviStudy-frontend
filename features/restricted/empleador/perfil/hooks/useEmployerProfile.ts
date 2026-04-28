import { useState, useEffect } from 'react'
import { getEmployerProfile, type EmployerProfileResponse } from '../services/profileService'

// Cache persistente en memoria para carga instantánea
let globalProfileCache: EmployerProfileResponse | null = null;
let isFirstLoad = true;

export const useEmployerProfile = () => {
  const [profile, setProfile] = useState<EmployerProfileResponse>(globalProfileCache || {})
  const [loading, setLoading] = useState(isFirstLoad && !globalProfileCache)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Si ya tenemos cache, dejamos de mostrar el skeleton principal inmediatamente
    if (globalProfileCache) {
      setLoading(false);
    }

    setEmail(localStorage.getItem("user_email") ?? "")

    const loadProfile = async () => {
      try {
        const data = await getEmployerProfile()
        if (data) {
          globalProfileCache = data;
          setProfile(data);
          localStorage.setItem("last_profile", JSON.stringify(data));
          
          const id = data.employerId || data.employer_id || data.id;
          if (id) localStorage.setItem("employer_id", id);
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
      } finally {
        setLoading(false)
        isFirstLoad = false;
      }
    }

    loadProfile()
  }, [])

  const inicial = (
    profile.businessName || 
    (profile as any).business_name || 
    profile.employerName || 
    (profile as any).employer_name || 
    email ||
    "E"
  ).charAt(0).toUpperCase()

  return {
    loading,
    profile,
    email,
    inicial
  }
}
