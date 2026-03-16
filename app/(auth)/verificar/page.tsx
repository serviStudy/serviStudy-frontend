"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeaderLR } from "@/components/shared/HeaderLR"

export default function Verificar() {

  const [code, setCode] = useState(["", "", "", "", "", ""])

  const handleChange = (value: string, index: number) => {
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
  }

  const handleVerify = () => {
    const finalCode = code.join("")
    console.log("Código enviado:", finalCode)

    // aquí enviarías el código al backend
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <HeaderLR/>

      <div className="bg-white w-full max-w-md rounded-xl p-8 text-center flex flex-col gap-6">

        <h1 className="text-2xl font-bold text-blue-700">
          Verifica tu identidad
        </h1>

        <p className="text-gray-500 text-sm">
          Hemos enviado un código de 6 dígitos a ejemplo@gmail.com
        </p>

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg border border-gray-400"
              maxLength={1}
            />
          ))}
        </div>

        <Button onClick={handleVerify}>
          Verificar código
        </Button>

        <p className="text-sm text-blue-600 cursor-pointer">
          ¿No recibiste el código? Reintentar
        </p>

        <a
          href="/login"
          className="text-blue-700 text-sm font-medium"
        >
          Volver al inicio de sesión
        </a>

      </div>

    </div>
  )
}