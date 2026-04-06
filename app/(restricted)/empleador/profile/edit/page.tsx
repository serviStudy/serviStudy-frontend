"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Camera, ChevronLeft, Loader2 } from "lucide-react"
import {
  getEmployerProfile,
  updateEmployerProfile
} from '@/features/profile/services/profileService'

export default function EditProfilePage() {
  const router = useRouter()

  const [loading, setLoading]           = useState(true)
  const [saving, setSaving]             = useState(false)
  const [employerName, setEmployerName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [contactNumber, setContactNumber]     = useState("")
  const [businessSummary, setBusinessSummary] = useState("")
  const [imageUrl, setImageUrl]         = useState<string | null>(null)   // URL actual del backend
  const [imageFile, setImageFile]       = useState<File | null>(null)     // Archivo nuevo a subir
  const [email, setEmail]               = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "")

    const loadProfile = async () => {
      try {
        const data = await getEmployerProfile()
        if (data) {
          setEmployerName(data.employerName    ?? "")
          setBusinessName(data.businessName    ?? "")
          setBusinessAddress(data.businessAddress ?? "")
          setContactNumber(data.contactNumber  ?? "")
          setBusinessSummary(data.businessSummary ?? "")
          setImageUrl(data.imageUrl            ?? null)
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error)
        toast.error("No se pudo cargar el perfil")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande. Máximo 5MB.")
      return
    }
    setImageFile(file)
    // Vista previa local
    const reader = new FileReader()
    reader.onloadend = () => setImageUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateEmployerProfile({
        employerName,
        businessName,
        businessAddress,
        contactNumber,
        businessSummary,
        imageFile: imageFile ?? undefined
      })
      toast.success("Perfil actualizado correctamente")
      router.push("/empleador/profile")
    } catch (error: any) {
      console.error("Error al guardar:", error)
      toast.error(error.message || "Error al guardar los cambios")
    } finally {
      setSaving(false)
    }
  }

  const inicial = (businessName || employerName || email).charAt(0).toUpperCase() || "E"

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <HeaderLR />
        <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-20">
      <HeaderLR />

      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <div className="mb-6 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-[#1a4b9e]"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver al perfil
          </Button>
          <h1 className="text-2xl font-bold text-[#1a4b9e]">Editar Perfil</h1>
        </div>

        <Card className="overflow-hidden border-none shadow-md rounded-[24px]">
          <div className="h-30 w-full bg-[#e8fbe5] lg:h-40 relative" />

          <CardContent className="px-6 pb-10 lg:px-10">
            {/* Avatar con cámara */}
            <div className="relative -mt-12 mb-8 inline-block">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#34c759] text-[40px] font-bold text-white shadow-sm">
                {imageUrl ? (
                  <img src={imageUrl} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  inicial
                )}
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-50 border border-gray-100"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4 text-[#34c759]" strokeWidth={2.5} />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Correo (solo lectura) */}
            <div className="mb-6 p-3 bg-gray-100 rounded-2xl">
              <p className="text-xs text-gray-400 font-semibold mb-0.5">Correo electrónico</p>
              <p className="text-sm text-gray-600 font-medium">{email || "—"}</p>
            </div>

            {/* Formulario */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employerName" className="text-[14px] font-bold text-gray-500">
                  Nombre del responsable
                </Label>
                <Input
                  id="employerName"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  placeholder="Ej: Carlos Guerra Morales"
                  className="rounded-2xl border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-[14px] font-bold text-gray-500">
                  Número de contacto
                </Label>
                <Input
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Ej: 315-887-9086"
                  className="rounded-2xl border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-[14px] font-bold text-gray-500">
                  Nombre del establecimiento
                </Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej: Tech Solutions"
                  className="rounded-2xl border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress" className="text-[14px] font-bold text-gray-500">
                  Dirección del establecimiento
                </Label>
                <Input
                  id="businessAddress"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Ej: Plaza de bolívar"
                  className="rounded-2xl border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="businessSummary" className="text-[14px] font-bold text-gray-500">
                Resumen profesional
              </Label>
              <Textarea
                id="businessSummary"
                value={businessSummary}
                onChange={(e) => setBusinessSummary(e.target.value)}
                placeholder="Describe brevemente tu empresa o establecimiento..."
                className="min-h-30 rounded-2xl border-gray-300 focus-visible:ring-[#1a4b9e]"
              />
            </div>

            {/* Botones */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                className="w-full sm:w-40 rounded-2xl border-none bg-gray-200 text-gray-600 font-bold hover:bg-gray-300"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                className="w-full sm:w-50 rounded-2xl bg-[#1a4b9e] text-white font-bold hover:bg-blue-800"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando...
                  </span>
                ) : "Guardar Cambios"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
