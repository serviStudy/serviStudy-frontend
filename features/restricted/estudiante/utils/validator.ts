import { removeRequestMeta } from "next/dist/server/request-meta"

export interface EditProfileData {
    name: string
    phone: string
    description: string
    skills: string[]
    days: string | null
    jornada: string | null
}

export type FormErrors = Partial<Record<keyof EditProfileData, string>>

export function validateSkill(value: string, skills: string[]): string | null {
    const trimmed = value.trim()

    if (!trimmed) return "La habilidad no puede estar vacía"
    if (skills.includes(trimmed)) return "La habilidad ya existe"
    if (skills.length >= 10) return "Máximo 10 habilidades"
    if (value.length < 3) return "Debe tener al menos 3 carácteres"
    return null
}

export function validateEditProfile(data: EditProfileData): FormErrors {
    const errors: FormErrors = {}

    const name = data.name.trim()
    const phone = data.phone.trim()
    const description = data.description.trim()
    const skills = data.skills

    if (!name) {
        errors.name = "El nombre es obligatorio"
    } else if (name.length < 3){
        errors.name = "Debe tener al menos 3 caracteres"
    }

    if (!phone) {
        errors.phone = "El teléfono es obligatorio"
    } else if (!/^\d{10}$/.test(phone)) {
        errors.phone = "Debe tener 10 dígitos"
    }

    if (description) {
        if(description.length < 10){
            errors.description = "Debe tener al menos 10 caracteres"
        }else if (description.length > 900){
            errors.description = "Máximo 900 caracteres"
        }
    }
    return errors
}