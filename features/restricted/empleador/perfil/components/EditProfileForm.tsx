import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { 
  Camera, ChevronLeft, Loader2, Building2, User, 
  Phone, MapPin, AlignLeft, Mail, ShieldCheck 
} from "lucide-react"
import { motion } from 'framer-motion'
import { VerifyEmployerModal } from './modals/VerifyEmployerModal'

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
  const [isVerifyModalOpen, setIsVerifyModalOpen] = React.useState(false)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 lg:px-8">
      {/* Header with improved navigation */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-green-600 transition-all font-semibold group"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs uppercase tracking-wider">Regresar al perfil</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Editar <span className="text-green-600">Perfil</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
          <ShieldCheck className="text-green-600 h-4 w-4" />
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Información Segura</span>
        </div>
      </div>

      {/* Verification Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 p-6 bg-gradient-to-r from-green-600 to-green-500 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm shadow-green-900/10 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 rounded-lg bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Verifica tu empresa</h3>
            <p className="text-white/80 font-medium text-xs mt-0.5">Adjunta tus documentos legales para obtener el sello de confianza.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsVerifyModalOpen(true)}
          className="px-8 h-12 bg-white text-green-600 rounded-lg font-bold text-xs uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95 relative z-10 whitespace-nowrap"
        >
          Verificar Ahora
        </button>
      </motion.div>

      <Card className="overflow-hidden border border-gray-100 shadow-sm rounded-xl bg-white">
        {/* Dynamic Header Banner - Green theme */}
        <div className="h-44 w-full bg-gradient-to-br from-green-800 via-green-600 to-green-400 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <CardContent className="px-8 lg:px-16 pb-16">
          {/* Centered Avatar Upload */}
          <div className="relative -mt-20 mb-16 flex flex-col items-center">
            <div className="relative group">
              <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl border-8 border-white bg-white shadow-md transition-all duration-500 group-hover:scale-105">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-contain p-4" />
                ) : (
                  <div className="h-full w-full bg-gray-50 flex items-center justify-center">
                    <span className="text-[60px] font-black text-green-700/10">{inicial}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-1 right-1 h-10 w-10 rounded-lg bg-green-600 shadow-md hover:bg-green-700 flex items-center justify-center transition-all z-10 text-white"
                onClick={actions.triggerFileInput}
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logo de la empresa</p>
            <input
              type="file"
              ref={refs.fileInputRef}
              onChange={actions.handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="space-y-12">
            {/* Section 1: Business Identity */}
            <div>
               <div className="flex items-center gap-3 mb-8">
                 <div className="h-6 w-1 bg-green-600 rounded-full"></div>
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Identidad Corporativa</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Comercial</Label>
                    <div className="relative">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4" />
                      <Input
                        value={formData.businessName}
                        onChange={(e) => setters.setBusinessName(e.target.value)}
                        className="h-12 pl-12 rounded-lg border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-green-500 transition-all font-medium text-gray-900 text-sm"
                        placeholder="Ej: ServiStudy Corp"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Responsable</Label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4" />
                      <Input
                        value={formData.employerName}
                        onChange={(e) => setters.setEmployerName(e.target.value)}
                        className="h-12 pl-12 rounded-lg border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-green-500 transition-all font-medium text-gray-900 text-sm"
                        placeholder="Nombre completo"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Section 2: Contact & Location */}
            <div>
               <div className="flex items-center gap-3 mb-8">
                 <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Contacto y Ubicación</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Teléfono de Contacto</Label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4" />
                      <Input
                        value={formData.contactNumber}
                        onChange={(e) => setters.setContactNumber(e.target.value)}
                        className="h-12 pl-12 rounded-lg border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-green-500 transition-all font-medium text-gray-900 text-sm"
                        placeholder="+57 300 000 0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Dirección Física</Label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 h-4 w-4" />
                      <Input
                        value={formData.businessAddress}
                        onChange={(e) => setters.setBusinessAddress(e.target.value)}
                        className="h-12 pl-12 rounded-lg border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-green-500 transition-all font-medium text-gray-900 text-sm"
                        placeholder="Calle, Ciudad, País"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Section 3: Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-6 w-1 bg-green-400 rounded-full"></div>
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Descripción de la Empresa</h2>
              </div>
              <div className="relative">
                <AlignLeft className="absolute left-6 top-6 text-gray-300 h-4 w-4" />
                <Textarea
                  value={formData.businessSummary}
                  onChange={(e) => setters.setBusinessSummary(e.target.value)}
                  className="min-h-[160px] pl-14 pt-5 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-green-500 transition-all font-medium text-gray-700 resize-none text-sm shadow-sm"
                  placeholder="Describe la visión, misión y lo que hace única a tu empresa..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-gray-100 pt-12">
            <button
              onClick={() => router.back()}
              disabled={saving}
              className="w-full sm:w-auto px-10 h-12 rounded-lg text-gray-400 font-bold text-xs hover:text-gray-900 transition-all uppercase tracking-widest"
            >
              Cancelar
            </button>
            <button
              onClick={actions.handleSave}
              disabled={saving}
              className="w-full sm:w-auto px-12 h-12 rounded-lg bg-green-600 text-white font-bold text-sm hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-900/10 flex items-center justify-center disabled:opacity-70"
            >
              {saving ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Guardando...
                </span>
              ) : "Guardar Cambios"}
            </button>
          </div>
        </CardContent>
      </Card>

      <VerifyEmployerModal 
        isOpen={isVerifyModalOpen} 
        onClose={() => setIsVerifyModalOpen(false)} 
      />
    </div>
  )
}
