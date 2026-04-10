import { useState, useEffect } from 'react'
import { getStudentProfile, type StudentProfileResponse } from '../services/studentProfileService'

export const useStudentProfile = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null)
  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "")

    const loadProfile = async () => {
      try {
        const data = await getStudentProfile()
        if (data) setProfile(data)
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const inicial = (profile?.name || email).charAt(0).toUpperCase() || "E"

  return {
    loading,
    profile,
    email,
    inicial
  }
}
