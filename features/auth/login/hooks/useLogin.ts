import { useState, useEffect } from "react"
import { loginService } from "../service/login.service"
import { usePersistentRole } from "@/hooks/usePersistentRole"
import { decodeJwt, JWTPayload } from "jose"

interface TokenPayload extends JWTPayload {
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const useLogin = () => {
  const { tipoUsuario, setTipoUsuario } = usePersistentRole()
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [errorCorreo, setErrorCorreo] = useState("")
  const [loading, setLoading] = useState(false)
  const [recordarme, setRecordarme] = useState(false)

  // Cargar credenciales guardadas al montar y auto-login si token está activo
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRemember = localStorage.getItem("remember_me") === "true"
      if (savedRemember) {
        const savedEmail = localStorage.getItem("remembered_email")
        const savedRole = localStorage.getItem("remembered_role")
        if (savedEmail) setCorreo(savedEmail)
        if (savedRole) setTipoUsuario(savedRole as any)
        setRecordarme(true)

        // Verificar token activo para auto-login
        const token = localStorage.getItem("token")
        if (token) {
          try {
            const decoded = decodeJwt(token)
            const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false
            if (!isExpired) {
              // Asegurar que la cookie esté presente para SSR
              document.cookie = `token=${token}; path=/; SameSite=Lax; max-age=2592000`
              const role = decoded.role || savedRole || localStorage.getItem("user_role")
              if (role) {
                const normalizedRole = (role as string).toUpperCase()
                if (normalizedRole === "STUDENT" || role === "estudiante") {
                  window.location.href = "/estudiante/perfil"
                } else {
                  window.location.href = "/empleador/perfil"
                }
              }
            }
          } catch (e) {
            console.error("Error al procesar el token para auto-login:", e)
          }
        }
      }
    }
  }, [])

  const processLoginData = (data: any) => {
    // GUARDAR TOKEN Y DATOS DE SESIÓN
    console.log("RAW LOGIN RESPONSE:", data)
    console.log("COPIA TODO ESTE TEXTO:", JSON.stringify(data, null, 2))

    if (!data.data) {
      throw new Error("Respuesta del servidor inválida: falta el objeto 'data'")
    }

    const token = data.data.token
    
    // Si 'recordarme' es true, establecemos max-age para 30 días, si no, es cookie de sesión
    const maxAge = recordarme ? "; max-age=2592000" : ""
    document.cookie = `token=${token}; path=/; SameSite=Lax${maxAge}`
    localStorage.setItem("token", token)

    let email = correo
    let role = tipoUsuario

    try {
      const decoded = decodeJwt(token)
      if (decoded.sub) email = decoded.sub
      if (decoded.role) role = decoded.role as any
    } catch (e) {
      console.error("Error decodificando JWT:", e)
    }

    localStorage.setItem("user_email", email)
    localStorage.setItem("user_role", role)

    // Manejar localStorage para pre-llenar en visitas futuras
    if (recordarme) {
      localStorage.setItem("remembered_email", email)
      localStorage.setItem("remembered_role", role)
      localStorage.setItem("remember_me", "true")
    } else {
      localStorage.removeItem("remembered_email")
      localStorage.removeItem("remembered_role")
      localStorage.removeItem("remember_me")
    }

    console.log("Sesión guardada (Token + Info Básica)")

    // REDIRECCIÓN AL PERFIL SEGÚN TIPO DE USUARIO
    // El backend envía "STUDENT" o "EMPLOYER" en el JWT
    const normalizedRole = (role as string).toUpperCase()
    if (normalizedRole === "STUDENT" || role === "estudiante") {
      window.location.href = "/estudiante/perfil"
    } else {
      window.location.href = "/empleador/perfil"
    }
  }

  const handleLogin = async () => {
    // VALIDACIÓN DE CORREO PARA ESTUDIANTE
    if (tipoUsuario === "estudiante" && !correo.endsWith(".edu.co")) {
      setErrorCorreo("El correo debe terminar en .edu para estudiantes")
      return
    }

    setErrorCorreo("")
    setLoading(true)

    try {
      const data = await loginService.login(correo, password)
      processLoginData(data)
    } catch (error: any) {
      console.error(error.message)
      setErrorCorreo(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential
    if (!idToken) {
      setErrorCorreo("No se recibió token de Google")
      return
    }
    setLoading(true)
    try {
      const data = await loginService.loginWithGoogle(idToken)
      processLoginData(data)
    } catch (error: any) {
      console.error("Error Google Login:", error.message)
      setErrorCorreo(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setErrorCorreo("No se pudo iniciar sesión con Google")
  }

  return {
    tipoUsuario,
    setTipoUsuario,
    correo,
    setCorreo,
    password,
    setPassword,
    errorCorreo,
    setErrorCorreo,
    loading,
    handleLogin,
    handleGoogleSuccess,
    handleGoogleError,
    recordarme,
    setRecordarme
  }
}
