export const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token") ?? ""

    return{
        Authorization: `Bearer ${token}`
    }
}