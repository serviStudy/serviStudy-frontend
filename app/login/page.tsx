"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {

  const [tipoUsuario, setTipoUsuario] = useState("estudiante")
  const [correo, setCorreo] = useState("")
  const [errorCorreo, setErrorCorreo] = useState("")

  const validarLogin = () => {

    if (tipoUsuario === "estudiante" && !correo.endsWith(".edu")) {
      setErrorCorreo("El correo debe terminar en .edu para estudiantes")
      return
    }

    setErrorCorreo("")
    alert("Login válido")

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <Card className="w-[400px] p-4">

        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Bienvenido de nuevo
          </CardTitle>

          <p className="text-center text-sm text-gray-500">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>

        </CardHeader>

        <CardContent className="space-y-4">

          {/* BOTONES ESTUDIANTE / EMPRESA */}

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


          {/* GOOGLE SOLO PARA EMPRESA */}

          {tipoUsuario === "empresa" && (

            <Button variant="outline" className="w-full">
              Iniciar con Google
            </Button>

          )}


          {/* SEPARADOR */}

          <div className="text-center text-sm text-gray-500">
            o continuar con email
          </div>


          {/* INPUT EMAIL */}

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


          {/* INPUT PASSWORD */}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-500">
              Contraseña
            </label>

            <Input type="password" placeholder="contraseña" />
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
            className={`w-full ${
              tipoUsuario === "empresa"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : ""
            }`}
          >
            Iniciar sesión
          </Button>


          {/* REGISTRO */}

          <p className="text-center text-sm text-gray-500">
            ¿Aún no tienes cuenta?
            <span className="text-primary ml-1 cursor-pointer">
              Regístrate gratis
            </span>
          </p>

        </CardContent>

      </Card>

    </div>

  )
}