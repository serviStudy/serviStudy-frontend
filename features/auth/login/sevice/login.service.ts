
export const login = async (email: string, password: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })

  const data = await res.json()
  console.log("LOGIN RESPONSE", data)

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Error en login")
  }

  return data
}

export const loginService = {
  login
}
