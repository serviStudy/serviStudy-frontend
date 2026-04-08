export async function studentProfileService(data: { name: string; phone: string, description: string },) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/profiles/student`, {
        method: "PATCH",
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
            message: result.message || "Error actualizando perfil",
            status: response.status
        };
    }

    return result;
} 