import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Camera, ChevronLeft, Loader2, Building2, User, Phone, MapPin, AlignLeft, Mail } from "lucide-react"

interface EditProfileFormProps {
  formData: {
    employerName: string
    businessName: string
    businessAddress: string
    contactNumber: string
    businessSummary: string
    imageUrl: string | null
    email: string
  }
  setters: {
    setEmployerName: (val: string) => void
    setBusinessName: (val: string) => void
    setBusinessAddress: (val: string) => void
    setContactNumber: (val: string) => void
    setBusinessSummary: (val: string) => void
  }
  actions: {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSave: () => void
    triggerFileInput: () => void
  }
  refs: {
    fileInputRef: React.RefObject<HTMLInputElement | null>
  }
  saving: boolean
  inicial: string
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  formData,
  setters,
  actions,
  refs,
  saving,
  inicial
}) => {
  const router = useRouter()

  return (
    <div className="mx-auto w-full max-w-5xl px-4 lg:px-8">
      {/* Header con botón volver alineado */}
      <div className="mb-10 flex flex-col gap-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 text-gray-500 hover:text-[#1a3683] transition-colors font-black group w-fit"
        >
          <div className="p-3 rounded-2xl bg-gray-100 group-hover:bg-blue-50 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
          <span className="text-lg">Volver al perfil</span>
        </button>
        <h1 className="text-4xl font-black text-[#1a3683] lg:text-5xl tracking-tighter">Editar Perfil</h1>
      </div>

      <Card className="overflow-hidden border border-gray-100 shadow-[0_25px_60px_rgba(0,0,0,0.06)] rounded-[50px] bg-white transition-all duration-500 hover:shadow-[0_35px_70px_rgba(0,0,0,0.1)]">
        {/* Banner con el gradiente premium de verdes pasteles */}
        <div className="h-40 w-full bg-gradient-to-r from-[#dcedc1] via-[#a8e6cf] to-[#81c784] lg:h-56 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-15"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
        </div>

        <CardContent className="px-6 pb-16 lg:px-16">
          {/* Avatar elevado con cámara */}
          <div className="relative -mt-20 mb-14 flex flex-col items-center lg:items-start lg:ml-6">
            <div className="relative group">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[3rem] border-[10px] border-white bg-gradient-to-br from-[#34c759] to-[#28a745] text-[50px] font-black text-white shadow-[0_20px_45px_-5px_rgba(0,0,0,0.15)] lg:h-[180px] lg:w-[180px] transition-transform hover:scale-[1.02]">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  <span className="drop-shadow-md select-none">{inicial}</span>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-2 right-2 h-14 w-14 rounded-2xl bg-white shadow-2xl hover:bg-gray-50 border border-gray-100 flex items-center justify-center group/btn active:scale-90 transition-all z-10"
                onClick={actions.triggerFileInput}
              >
                <Camera className="h-6 w-6 text-[#34c759] group-hover/btn:scale-110 transition-transform" strokeWidth={2.5} />
              </button>
            </div>
            <input
              type="file"
              ref={refs.fileInputRef}
              onChange={actions.handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Información Solo Lectura - Elongada */}
          <div className="mb-12 flex items-center gap-6 p-7 bg-gradient-to-r from-blue-50/50 via-blue-50/20 to-transparent border border-blue-100/50 rounded-[35px]">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <Mail className="h-6 w-6 text-[#1a4b9e]" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-[#1a4b9e] font-black uppercase tracking-widest mb-1">Identidad de la cuenta</p>
              <p className="text-xl lg:text-2xl text-gray-700 font-bold leading-tight">{formData.email || "—"}</p>
            </div>
          </div>

          {/* Formulario a Escala Completa con Colores de Texto Forzados */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <Label htmlFor="employerName" className="text-[15px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                <User size={18} className="text-[#1a3683]" />
                Responsable de la empresa
              </Label>
              <Input
                id="employerName"
                value={formData.employerName}
                onChange={(e) => setters.setEmployerName(e.target.value)}
                placeholder="Ej: Carlos Guerra Morales"
                className="h-16 rounded-[25px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all font-bold px-7 text-lg shadow-sm text-gray-900"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="contactNumber" className="text-[15px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                <Phone size={18} className="text-[#1a4b9e]" />
                Número de contacto
              </Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setters.setContactNumber(e.target.value)}
                placeholder="Ej: 315-887-9086"
                className="h-16 rounded-[25px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all font-bold px-7 text-lg shadow-sm text-gray-900"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="businessName" className="text-[15px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                <Building2 size={18} className="text-[#1a4b9e]" />
                Nombre del Negocio
              </Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setters.setBusinessName(e.target.value)}
                placeholder="Ej: Tech Solutions"
                className="h-16 rounded-[25px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all px-7 font-black text-[#1a4b9e] text-lg shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="businessAddress" className="text-[15px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                <MapPin size={18} className="text-[#1a3683]" />
                Dirección Física
              </Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => setters.setBusinessAddress(e.target.value)}
                placeholder="Ej: Plaza de bolívar"
                className="h-16 rounded-[25px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all font-bold px-7 text-lg shadow-sm text-gray-900"
              />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <Label htmlFor="businessSummary" className="text-[15px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-2">
              <AlignLeft size={18} className="text-[#1a3683]" />
              Resumen Profesional
            </Label>
            <Textarea
              id="businessSummary"
              value={formData.businessSummary}
              onChange={(e) => setters.setBusinessSummary(e.target.value)}
              placeholder="Describe detalladamente tu empresa o establecimiento..."
              className="min-h-[200px] rounded-[35px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all p-8 font-medium resize-none text-[18px] shadow-sm text-gray-900"
            />
          </div>

          {/* Botones de acción Estratégicos */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => router.back()}
              disabled={saving}
              className="w-full sm:w-56 h-16 rounded-2xl border border-gray-200 text-gray-600 font-black text-lg hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
            >
              Cancelar
            </button>
            <button
              onClick={actions.handleSave}
              disabled={saving}
              className="w-full sm:w-80 h-16 rounded-2xl bg-[#1a4b9e] text-white font-black text-xl hover:bg-[#153a7a] active:scale-95 transition-all shadow-[0_20px_50px_-10px_rgba(26,54,131,0.4)] hover:shadow-[0_25px_60px_-5px_rgba(26,54,131,0.5)] flex items-center justify-center disabled:opacity-70"
            >
              {saving ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Actualizando...
                </span>
              ) : "Actualizar Perfil de Empresa"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
