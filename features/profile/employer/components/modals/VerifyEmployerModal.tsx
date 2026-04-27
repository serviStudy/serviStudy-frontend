import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ShieldCheck, CloudUpload } from "lucide-react"

interface VerifyEmployerModalProps {
  isOpen: boolean
  onClose: () => void
}

export const VerifyEmployerModal = ({ isOpen, onClose }: VerifyEmployerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] overflow-hidden rounded-[32px] bg-white text-center p-8 border-none shadow-2xl">
        <div className="flex flex-col items-center relative mb-8">
          <div className="flex items-center gap-4 w-full">
            <div className="bg-green-100 rounded-2xl p-3 animate-pulse">
              <ShieldCheck className="h-8 w-8 text-green-600" strokeWidth={1.5}/>
            </div>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
              Verificar Empresa
            </DialogTitle>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-gray-500 font-medium text-sm text-left w-full">
            Para obtener el sello de confianza, adjunta el documento legal de tu empresa (RUT o Cámara de Comercio).
          </p>
          
          <label className="flex flex-col items-center justify-center w-full h-48 rounded-[24px] border-2 border-dashed border-green-200 bg-green-50/30 hover:bg-green-50 transition-all cursor-pointer group shadow-inner">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
              <CloudUpload className="h-8 w-8 text-green-600" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-black text-green-700 tracking-tight">Subir Documento</span>
            <span className="text-xs text-gray-400 font-bold mt-1">PDF, JPG o PNG (Máx 5MB)</span>
            <input type="file" className="hidden" />
          </label>
          
          <button 
            onClick={onClose}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-green-900/20 active:scale-95"
          >
            Confirmar Envío
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
