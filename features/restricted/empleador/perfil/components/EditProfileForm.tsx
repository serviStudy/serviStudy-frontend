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
  isPremium?: boolean
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  formData,
  setters,
  actions,
  refs,
  saving,
  inicial,
  isPremium = false
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
            className={`flex items-center gap-2 transition-all font-semibold group ${
              isPremium ? 'text-gray-400 hover:text-blue-600' : 'text-gray-400 hover:text-green-600'
            }`}
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs uppercase tracking-wider">Regresar al perfil</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Editar <span className={isPremium ? "text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-500" : "text-green-600"}>Perfil</span>
          </h1>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
          isPremium ? 'bg-linear-to-r from-blue-50 to-green-50 border-blue-100/50' : 'bg-green-50 border-green-100'
        }`}>
          <ShieldCheck className={`h-4 w-4 ${isPremium ? 'text-blue-600' : 'text-green-600'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isPremium ? 'text-blue-600' : 'text-green-600'}`}>Información Segura</span>
        </div>
      </div>

      <Card className={`overflow-hidden rounded-xl ${
        isPremium 
          ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
          : 'bg-white border border-gray-100 shadow-sm'
      }`}>
        {/* Dynamic Header Banner */}
        <div className={`h-44 w-full relative ${
          isPremium 
            ? 'bg-gradient-to-br from-green-500 via-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-green-800 via-green-600 to-green-400'
        }`}>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          {isPremium && (
            <>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/15 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-300/25 blur-2xl rounded-full translate-y-1/2 -translate-x-1/4" />
            </>
          )}
        </div>

        <CardContent className="px-8 lg:px-16 pb-16">
          {/* Centered Avatar Upload */}
          <div className="relative -mt-20 mb-16 flex flex-col items-center">
            <div className="relative group">
              <div className={`flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl border-8 border-white bg-white shadow-md transition-all duration-500 group-hover:scale-105 ${
                isPremium ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : ''
              }`}>
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-contain p-4" />
                ) : (
                  <div className="h-full w-full bg-gray-50 flex items-center justify-center">
                    <span className={`text-[60px] font-black ${isPremium ? 'text-blue-600/10' : 'text-green-700/10'}`}>{inicial}</span>
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
                 <div className={`h-6 w-1 rounded-full ${isPremium ? 'bg-blue-500' : 'bg-green-600'}`}></div>
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Identidad Corporativa</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Comercial</Label>
                    <div className="relative">
                      <Building2 className={`absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 ${isPremium ? 'text-blue-300' : 'text-gray-300'}`} />
                      <Input
                        value={formData.businessName}
                        onChange={(e) => setters.setBusinessName(e.target.value)}
                        className={`h-12 pl-12 rounded-xl transition-all font-medium text-gray-900 text-sm shadow-sm ${
                          isPremium 
                            ? 'border-blue-100/50 bg-blue-50/30 hover:bg-blue-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
                        }`}
                        placeholder="Ej: ServiStudy Corp"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Responsable</Label>
                    <div className="relative">
                      <User className={`absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 ${isPremium ? 'text-blue-300' : 'text-gray-300'}`} />
                      <Input
                        value={formData.employerName}
                        onChange={(e) => setters.setEmployerName(e.target.value)}
                        className={`h-12 pl-12 rounded-xl transition-all font-medium text-gray-900 text-sm shadow-sm ${
                          isPremium 
                            ? 'border-blue-100/50 bg-blue-50/30 hover:bg-blue-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
                        }`}
                        placeholder="Nombre completo"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Section 2: Contact & Location */}
            <div>
               <div className="flex items-center gap-3 mb-8">
                 <div className={`h-6 w-1 rounded-full ${isPremium ? 'bg-blue-400' : 'bg-green-500'}`}></div>
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Contacto y Ubicación</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Teléfono de Contacto</Label>
                    <div className="relative">
                      <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 ${isPremium ? 'text-blue-300' : 'text-gray-300'}`} />
                      <Input
                        value={formData.contactNumber}
                        onChange={(e) => setters.setContactNumber(e.target.value)}
                        className={`h-12 pl-12 rounded-xl transition-all font-medium text-gray-900 text-sm shadow-sm ${
                          isPremium 
                            ? 'border-blue-100/50 bg-blue-50/30 hover:bg-blue-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
                        }`}
                        placeholder="+57 300 000 0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Dirección Física</Label>
                    <div className="relative">
                      <MapPin className={`absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 ${isPremium ? 'text-blue-300' : 'text-gray-300'}`} />
                      <Input
                        value={formData.businessAddress}
                        onChange={(e) => setters.setBusinessAddress(e.target.value)}
                        className={`h-12 pl-12 rounded-xl transition-all font-medium text-gray-900 text-sm shadow-sm ${
                          isPremium 
                            ? 'border-blue-100/50 bg-blue-50/30 hover:bg-blue-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
                        }`}
                        placeholder="Calle, Ciudad, País"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Section 3: Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                 <div className={`h-6 w-1 rounded-full ${isPremium ? 'bg-blue-300' : 'bg-green-400'}`}></div>
                 <h2 className="text-lg font-bold text-gray-900 tracking-tight">Descripción de la Empresa</h2>
              </div>
              <div className="relative">
                <AlignLeft className={`absolute left-6 top-6 h-4 w-4 ${isPremium ? 'text-blue-300' : 'text-gray-300'}`} />
                <Textarea
                  value={formData.businessSummary}
                  onChange={(e) => setters.setBusinessSummary(e.target.value)}
                  className={`min-h-[160px] pl-14 pt-5 rounded-xl transition-all font-medium text-gray-700 resize-none text-sm shadow-sm ${
                    isPremium 
                      ? 'border-blue-100/50 bg-blue-50/30 hover:bg-blue-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:bg-white focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
                  }`}
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
              className={`w-full sm:w-auto px-12 h-12 rounded-lg text-white font-bold text-sm active:scale-95 transition-all flex items-center justify-center disabled:opacity-70 ${
                isPremium 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg' 
                  : 'bg-green-600 hover:bg-green-700 shadow-md shadow-green-900/10'
              }`}
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
