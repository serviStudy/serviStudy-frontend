import { useState } from "react"
import { loginService } from "../sevice/login.service"

export const useLogin = () => {
  const [tipoUsuario, setTipoUsuario] = useState("estudiante")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [errorCorreo, setErrorCorreo] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    // VALIDACIÓN DE CORREO PARA ESTUDIANTE
    if (tipoUsuario === "estudiante" && !correo.endsWith(".edu")) {
      setErrorCorreo("El correo debe terminar en .edu para estudiantes")
      return
    }

    setErrorCorreo("")
    setLoading(true)

    try {
      const data = await loginService.login(correo, password)

      // GUARDAR TOKEN Y DATOS DE SESIÓN
      console.log("RAW LOGIN RESPONSE:", data)
      console.log("COPIA TODO ESTE TEXTO:", JSON.stringify(data, null, 2))
      
      if (!data.data) {
        throw new Error("Respuesta del servidor inválida: falta el objeto 'data'")
      }

      localStorage.setItem("token", data.data.token)
      localStorage.setItem("user_email", correo)
      localStorage.setItem("user_role", tipoUsuario)
      
      // Capturamos el ID de cualquier campo posible
      const anyId = data.data.userId || data.data.id || data.data.employerId || data.data.employer_id || ""
      
      if (!anyId) {
        console.warn("⚠️ ALERTA: No se encontró ningún ID (userId/id/employerId) en la respuesta del login.")
      }

      localStorage.setItem("user_id", anyId)
      localStorage.setItem("employer_id", anyId)

      console.log("Sesión guardada con IDs:", { anyId })

      // REDIRECCIÓN AL PERFIL SEGÚN TIPO DE USUARIO
      if (tipoUsuario === "estudiante") {
        window.location.href = "/estudiante/profile"
      } else {
        window.location.href = "/empleador/profile"
      }

    } catch (error: any) {
      console.error(error.message)
      setErrorCorreo(error.message)
    } finally {
      setLoading(false)
    }
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
    handleLogin
  }
}
