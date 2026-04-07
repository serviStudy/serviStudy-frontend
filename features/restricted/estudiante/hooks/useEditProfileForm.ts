import { useState } from "react"
import { validateEditProfile } from "../utils/validator"
import { toast } from "sonner"

export const useEditProfileForm = (selectedTags: any) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        description: ""
    })

    const [skills, setSkills] = useState<string[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})

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

    function handleSubmit() {
        const formErrors = validateEditProfile({
            name: formData.name,
            phone: formData.phone,
            description: formData.description,
            skills,
            days: selectedTags.day || [],
            jornada: selectedTags.jornada || []
        })
        setErrors(formErrors)

        if (Object.keys(formErrors).length > 0) return

        console.log("ENVIAR AL BACKEND", {
            ...formData,
            skills,
            selectedTags
        })

    }

    return {
        formData,
        handleChange,
        handleCancel,
        handleSubmit,
        skills,
        setSkills,
        errors
    }
}