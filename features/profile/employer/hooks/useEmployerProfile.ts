import { useState, useEffect } from 'react'
import { getEmployerProfile, type EmployerProfileResponse } from '../services/profileService'

export const useEmployerProfile = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<EmployerProfileResponse>({})
  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "")

    const loadProfile = async () => {
      try {
        const data = await getEmployerProfile()
        if (data) setProfile(data)
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const inicial = (
    profile.businessName || 
    (profile as any).business_name || 
    profile.employerName || 
    (profile as any).employer_name || 
    email
  ).charAt(0).toUpperCase() || "E"

  return {
    loading,
    profile,
    email,
    inicial
  }
}
