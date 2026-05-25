export const login = async (email: string, password: string) => {
  const API_URL = "/api/proxy"

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

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const message = errorData?.message || `Error ${res.status} en login`
    throw new Error(message)
  }

  const data = await res.json()
  console.log("LOGIN RESPONSE", data)

  if (!data.success) {
    throw new Error(data.message || "Error en login")
  }

  return data
}

export const loginWithGoogle = async (googleToken: string) => {
  const API_URL = "/api/proxy"

  const res = await fetch(`${API_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: googleToken
    })
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const message = errorData?.message || `Error ${res.status} en login con Google`
    throw new Error(message)
  }

  const data = await res.json()
  console.log("GOOGLE LOGIN RESPONSE", data)

  if (!data.success) {
    throw new Error(data.message || "Error en login con Google")
  }

  return data
}

export const loginService = {
  login,
  loginWithGoogle
}
