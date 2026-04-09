import { useState } from "react"
import { validateEditProfile } from "../utils/validator"
import { toast } from "sonner"
import { studentProfileService } from "@/lib/api/profile.service"

type Selection = {
    day: string | null;
    jornada: string | null;
}

export const useEditProfileForm = (selection: Selection) => {
    const [loading , setLoading] = useState(false)
    const [skillError, setSkillError] = useState<string | null>(null) 

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        description: "",
    })

    const [skills, setSkills] = useState<string[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [image, setImage] = useState<File | null>(null)

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        if (e.target.files && e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    function handleCancel() {
        setFormData({
            name: "",
            phone: "",
            description: ""
        })
        setSkills([])
        setErrors({})
    }

    async function handleSubmit() {
        const formErrors = validateEditProfile({
            name: formData.name,
            phone: formData.phone,
            description: formData.description,
            skills,
            days: selection.day,
            jornada: selection.jornada
        })
        setErrors(formErrors)
        setSkillError(formErrors.skills || null)

        if (Object.keys(formErrors).length > 0) return

        setLoading(true)

        try{
            const profileJson = {
                name: formData.name,
                phone: formData.phone,
                description: formData.description,
                skills,
                days: selection.day,
                jornada: selection.jornada
            }

            const data = new FormData()

            data.append(
                "data",
                new Blob([JSON.stringify(profileJson)],{
                    type: "application/json"
                })
            )

            if (image){
                data.append("image", image)
            }

            await studentProfileService(data)        
            toast.success("Perfil actualizado")

        }catch (error: any){
            let message = error.message || "Error desconocido"

            if (error.status === 409) {
                message = "El perfil ya ha sido actualizado"
            } else if (error.status === 500) {
                message = "Error interno del servidor"
            } 

            toast.error(message);
        } finally{
            setLoading(false)
        }
    }

    return {
        formData,
        handleChange,
        handleCancel,
        handleSubmit,
        handleImageChange,
        skills,
        image,
        setSkills,
        errors,
        skillError,
        setSkillError,
        loading,
        selection
    }
}