import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  getEmployerProfile,
  updateEmployerProfile
} from '../services/profileService'

export const useEditEmployerProfile = () => {
  const router = useRouter()

  const [loading, setLoading]           = useState(true)
  const [saving, setSaving]             = useState(false)
  const [employerName, setEmployerName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [contactNumber, setContactNumber]     = useState("")
  const [businessSummary, setBusinessSummary] = useState("")
  const [imageUrl, setImageUrl]         = useState<string | null>(null)
  const [imageFile, setImageFile]       = useState<File | null>(null)
  const [email, setEmail]               = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "")

    const loadProfile = async () => {
      try {
        const data = await getEmployerProfile()
        if (data) {
          setEmployerName(data.employerName || (data as any).employer_name || "")
          setBusinessName(data.businessName || (data as any).business_name || "")
          setBusinessAddress(data.businessAddress || (data as any).business_address || "")
          setContactNumber(data.contactNumber || (data as any).contact_number || "")
          setBusinessSummary(data.businessSummary || (data as any).business_summary || "")
          setImageUrl(data.imageUrl || (data as any).image_url || null)
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error)
        toast.error("No se pudo cargar el perfil")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande. Máximo 5MB.")
      return
    }
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImageUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateEmployerProfile({
        employerName,
        businessName,
        businessAddress,
        contactNumber,
        businessSummary,
        imageFile: imageFile ?? undefined
      })
      toast.success("Perfil actualizado correctamente")
      router.push("/empleador/perfil")
    } catch (error: any) {
      console.error("Error al guardar:", error)
      toast.error(error.message || "Error al guardar los cambios")
    } finally {
      setSaving(false)
    }
  }

  const inicial = (businessName || employerName || email).charAt(0).toUpperCase() || "E"

  return {
    loading,
    saving,
    formData: {
      employerName,
      businessName,
      businessAddress,
      contactNumber,
      businessSummary,
      imageUrl,
      email
    },
    setters: {
      setEmployerName,
      setBusinessName,
      setBusinessAddress,
      setContactNumber,
      setBusinessSummary
    },
    actions: {
      handleImageChange,
      handleSave,
      triggerFileInput: () => fileInputRef.current?.click()
    },
    refs: {
      fileInputRef
    },
    inicial
  }
}
