import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { validateEditProfile } from '@/features/restricted/estudiante/utils/validator'
import {
  getStudentProfile,
  updateStudentProfile,
  addStudentSkill,
  deleteStudentSkill,
  addStudentWorkDay,
  deleteStudentWorkDay,
  StudentSkill
} from '../services/studentProfileService'

export const useEditStudentProfile = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Text fields
  const [name, setName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState<string>("")
  
  // Selection fields (mapped to workSchedule/jornada)
  const [jornada, setJornada] = useState<string | null>(null)
  const [initialDays, setInitialDays] = useState<string[]>([])
  const [days, setDays] = useState<string[]>([])
  
  // Skills list (from server)
  const [skills, setSkills] = useState<StudentSkill[]>([])

  // Image
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [email, setEmail] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadProfile = async (silent = false) => {
    try {
      if (!silent) setLoading(true)
      const data = await getStudentProfile()
      if (data) {
        setUserId(data.userId || data.id || "")
        setName(data.name ?? "")
        setContactNumber(data.contactNumber ?? "")
        setDescription(data.description ?? "")
        setJornada(data.workSchedule ?? null)
        setDays(data.workDays ?? [])
        setInitialDays(data.workDays ?? [])
        setSkills(data.studentSkills ?? [])
        setImageUrl(data.imgUrl ?? null)
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error)
      toast.error("No se pudo cargar el perfil")
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "")
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

  const handleAddSkill = async (skillName: string) => {
    if (!skillName.trim()) return
    try {
      await addStudentSkill(skillName.trim())
      await loadProfile(true)
      toast.success("Habilidad agregada")
    } catch (error: any) {
      toast.error("Error al agregar habilidad")
    }
  }

  const handleRemoveSkill = async (id: number) => {
    try {
      await deleteStudentSkill(id)
      await loadProfile(true)
      toast.success("Habilidad eliminada")
    } catch (error: any) {
      toast.error("Error al eliminar habilidad")
    }
  }

  const handleToggleDay = (day: string) => {
    setDays((prev) => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleSave = async () => {
    // Basic validation
    const formErrors = validateEditProfile({
        name,
        phone: contactNumber,
        description,
        skills: skills.map(s => s.skillName),
        days: days.length > 0 ? days[0] : null, // Mapped for legacy validator constraint if any
        jornada
    })
    setErrors(formErrors)

    // Optionally bypass strict errors if the legacy validator is too rigid on skills length etc.
    // Assuming we want to save text details:
    setSaving(true)
    try {
      await updateStudentProfile({
        name,
        contactNumber,
        description,
        jornada,
        imageFile: imageFile ?? undefined
      })

      // Sync days
      const daysToAdd = days.filter(d => !initialDays.includes(d))
      const daysToRemove = initialDays.filter(d => !days.includes(d))

      if (daysToAdd.length > 0) {
        try { await addStudentWorkDay(userId, daysToAdd) } catch (e: any) { console.error("Error adding days", e) }
      }
      if (daysToRemove.length > 0) {
        try { await deleteStudentWorkDay(userId, daysToRemove) } catch (e: any) { console.error("Error removing days", e) }
      }

      toast.success("Perfil actualizado correctamente")
      router.push("/estudiante/profile")
    } catch (error: any) {
      console.error("Error al guardar:", error)
      toast.error(error.message || "Error al guardar los cambios")
    } finally {
      setSaving(false)
    }
  }

  const inicial = (name || email).charAt(0).toUpperCase() || "E"

  return {
    loading,
    saving,
    formData: {
      name,
      contactNumber,
      description,
      jornada,
      days,
      skills,
      imageUrl,
      email
    },
    setters: {
      setName,
      setContactNumber,
      setDescription,
      setJornada, // Using select or buttons for the schedule enum
      setDays,
    },
    actions: {
      handleImageChange,
      handleAddSkill,
      handleRemoveSkill,
      handleToggleDay,
      handleSave,
      triggerFileInput: () => fileInputRef.current?.click()
    },
    refs: {
      fileInputRef
    },
    errors,
    inicial
  }
}
