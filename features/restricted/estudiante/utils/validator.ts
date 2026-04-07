export interface EditProfileData {
    name: string
    phone: string
    description: string
    skills: string[]
    days: string[]
    jornada: string[]
}

export type FormErrors = Partial<Record<keyof EditProfileData, string>>

export function validateSkill(value: string, skills: string[]): string | null {
    const trimmed = value.trim()

    if (!trimmed) return "La habilidad no puede estar vacía"
    if (skills.includes(trimmed)) return "La habilidad ya existe"
    if (skills.length >= 10) return "Máximo 10 habilidades"
    return null
}

export function validateEditProfile(data: EditProfileData): FormErrors {
    const errors: FormErrors = {}

    const name = data.name.trim()
    const phone = data.phone.trim()
    const description = data.description.trim()

    if (!name) {
        errors.name = "El nombre es obligatorio"
    }else if (name.length < 3){
        errors.name = "Debe tener al menos 3 caracteres"
    }

    if (!phone) {
        errors.phone = "El teléfono es obligatorio"
    } else if (!/^\d{10}$/.test(phone)) {
        errors.phone = "Debe tener 10 dígitos"
    } else if (phone.length !== 10){
        errors.phone = "Debe tener exactamente 10 dígitos"
    }

    if (!description) {
        errors.description = "Campo obligatorio"
    } else if(description.length < 10){
        errors.description = "Debe tener al menos 10 caracteres"
    }else if (description.length > 200){
        errors.description = "Máximo 200 caracteres"
    }

    if (data.skills.length === 0) {
        errors.skills = "Debes agregar al menos una habilidad"
    }

    if (!data.days || data.days.length === 0) {
        errors.days = "Selecciona al menos un día"
    }

    if (!data.jornada || data.jornada.length === 0) {
        errors.jornada = "Selecciona una jornada"
    }

    return errors
}