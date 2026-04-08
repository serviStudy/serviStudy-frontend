import { getAuthHeaders } from "./authHeaders";

export interface StudentProfile {
    imgUrl?: string,
    name?: string,
    email?: string,
    verificationStatus?: boolean
    contactNumber?: string
    workDays?: string[]
    workSchedule?: string
    description?: string
    skills?: string[]
}

export const mapStudentProfile = (data: any): StudentProfile => {
    return{
        imgUrl: data.imgUrl,
        name: data.name,
        email: data.email,
        verificationStatus: data.verifyStatus,
        contactNumber: data.contactNumber,
        workDays: data.workDays,
        workSchedule: data.workSchedule,
        description: data.description,
        skills: data.studentSkills?.map((skill: any) => skill.skillName) || []
    }
}

export interface studentProfileUpdate {
    imgUrl:string,
    name?: string,
    email?: string,
    verificationStatus?: boolean,
    contactNumber?: string,
    description?: string
}

export interface studentSkills {
    
}

export async function studentProfileService(data: FormData) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/profiles/student`, {
        method: "PATCH",
        headers: {
            ...getAuthHeaders()
        },
        body: data
    })

    let result;
    try {
        result = await response.json();
        console.log("Respuesta backend:", result)
    }catch{
        result = {};
    }
    
    if (!response.ok) {
        throw{
            message: result.message || "Error actualizando perfil",
            status: response.status
        };
    }

    return result;
} 