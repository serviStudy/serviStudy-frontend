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
    if (tipoUsuario === "estudiante" && !correo.endsWith(".edu.co")) {
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

      document.cookie = `token=${data.data.token}; path=/; SameSite=Lax` //Guarda el token como cookie al hacer login para usarlo en el Sidebar employer/student
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("user_email", correo)
      localStorage.setItem("user_role", tipoUsuario)

      console.log("Sesión guardada (Token + Info Básica)")

      // REDIRECCIÓN AL PERFIL SEGÚN TIPO DE USUARIO
      if (tipoUsuario === "estudiante") {
        window.location.href = "/estudiante/perfil"
      } else {
        window.location.href = "/empleador/perfil"
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
