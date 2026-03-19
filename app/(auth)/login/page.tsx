"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { HeaderLR } from "@/components/shared/HeaderLR"
import Link from "next/link"

export default function LoginPage() {

  const [tipoUsuario, setTipoUsuario] = useState("estudiante")

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
      
        <div className="flex justify-center gap-2 bg-gray-200 p-2 rounded-lg w-fit mx-auto">

          <Button
            className={
              tipoUsuario === "estudiante"
                ? "bg-primary text-white"
                : "bg-white text-black border hover:bg-gray-100"
            }
            onClick={() => setTipoUsuario("estudiante")}
          >
            Estudiante
          </Button>


          <Button
            className={
              tipoUsuario === "empresa"
                ? "bg-green-600 hover:bg-green-700 text-white hover:bg-green" 
                : "bg-white text-black border hover:bg-gray-100"
            }
            onClick={() => setTipoUsuario("empresa")}
          >
            Empresa
          </Button>

        </div>
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

                <Input placeholder="ejemplo@gmail.com" />
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
            <Link href="/registro" className="ml-1 cursor-pointer hover:underline text-primary">
              Registrate gratis
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}