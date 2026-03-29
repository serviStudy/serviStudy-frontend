import { TipoUsuario } from "@/type/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getEndpoint(tipoUsuario: TipoUsuario){
    return tipoUsuario === "estudiante" ? "student" : "employer";
}

export async function registerUser(data: { email: string; password: string }, tipoUsuario: TipoUsuario) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/users/register/${getEndpoint(tipoUsuario)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
            message: result.message || "Error en el registro",
            status: response.status
        };
    }

    return result;
} 