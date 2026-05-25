import { useState } from "react"
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

  const processLoginData = (data: any) => {
    // GUARDAR TOKEN Y DATOS DE SESIÓN
    console.log("RAW LOGIN RESPONSE:", data)
    console.log("COPIA TODO ESTE TEXTO:", JSON.stringify(data, null, 2))

    if (!data.data) {
      throw new Error("Respuesta del servidor inválida: falta el objeto 'data'")
    }

    document.cookie = `token=${data.data.token}; path=/; SameSite=Lax` //Guarda el token como cookie al hacer login para usarlo en el Sidebar employer/student
    localStorage.setItem("token", data.data.token)
    localStorage.setItem("user_email", data.data.email || correo)
    localStorage.setItem("user_role", data.data.role || tipoUsuario)

    console.log("Sesión guardada (Token + Info Básica)")

    // REDIRECCIÓN AL PERFIL SEGÚN TIPO DE USUARIO
    if (data.data.role === "estudiante" || tipoUsuario === "estudiante") {
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
    handleGoogleError
  }
}
