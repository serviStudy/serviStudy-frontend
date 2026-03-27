"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { HeaderLR } from "@/components/shared/HeaderLR"
import Link from "next/link"

export default function LoginPage() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

const [tipoUsuario, setTipoUsuario] = useState("estudiante")
const [correo, setCorreo] = useState("")
const [password, setPassword] = useState("")
const [errorCorreo, setErrorCorreo] = useState("")
const [loading, setLoading] = useState(false)

const validarLogin = async () => {


// VALIDACIÓN DE CORREO PARA ESTUDIANTE
if (tipoUsuario === "estudiante" && !correo.endsWith(".edu")) {
  setErrorCorreo("El correo debe terminar en .edu para estudiantes")
  return
}

setErrorCorreo("")
setLoading(true)

try {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: correo,
      password: password
    })
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Error en login")
  }

  // GUARDAR TOKEN
  localStorage.setItem("token", data.data.token)

  console.log("Login exitoso", data)

  // REDIRECCIÓN
  window.location.href = "/"

} catch (error:any) {
  console.error(error.message)
  setErrorCorreo(error.message)
} finally {
  setLoading(false)
}


}

return (


<div className="flex min-h-screen items-center justify-center bg-gray-100">
  <HeaderLR/>

  <Card className="w-100 p-4">

    <CardHeader>
      <CardTitle className="text-center text-2xl font-bold text-primary">
        Bienvenido de nuevo
      </CardTitle>

      <p className="text-center text-sm text-gray-500">
        Ingresa tus credenciales para acceder a tu cuenta.
      </p>
    </CardHeader>

    <CardContent className="space-y-4">
  
      {/* TIPO DE USUARIO */}
      <div className="flex justify-center gap-2 bg-gray-200 p-2 rounded-lg w-fit mx-auto">

        <Button
          className={
            tipoUsuario === "estudiante"
              ? "bg-primary text-white"
              : "bg-white text-black border hover:bg-gray-100"
          }
          onClick={() => {
            setTipoUsuario("estudiante")
            setErrorCorreo("")
          }}
        >
          Estudiante
        </Button>

        <Button
          className={
            tipoUsuario === "empresa"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-white text-black border hover:bg-gray-100"
          }
          onClick={() => {
            setTipoUsuario("empresa")
            setErrorCorreo("")
          }}
        >
          Empresa
        </Button>

      </div>

      {/* GOOGLE SOLO EMPRESA */}
      {tipoUsuario === "empresa" && (
        <Button variant="outline" className="w-full">
          Iniciar con Google
        </Button>
      )}

      {/* SEPARADOR */}
      <div className="text-center text-sm text-gray-500">
        o continuar con email
      </div>

      {/* EMAIL */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-500">
          Correo electrónico
        </label>

        <Input
          placeholder="ejemplo@universidad.edu"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        {errorCorreo && (
          <p className="text-red-500 text-sm">
            {errorCorreo}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-500">
          Contraseña
        </label>

        <Input
          type="password"
          placeholder="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* RECORDAR */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>Recordarme</span>
        </div>

        <a className="text-primary hover:underline">
          ¿olvidaste tu contraseña?
        </a>
      </div>

      {/* BOTÓN LOGIN */}
      <Button
        onClick={validarLogin}
        disabled={loading}
        className={`w-full ${
          tipoUsuario === "empresa"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : ""
        }`}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>

      {/* REGISTRO */}
      <p className="text-center text-sm text-gray-500">
        ¿Aún no tienes cuenta?
        <Link
          href="/registro"
          className="ml-1 cursor-pointer hover:underline text-primary"
        >
          Registrate gratis
        </Link>
      </p>

    </CardContent>
  </Card>
</div>


)
}
