"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ShieldCheck, CloudUpload } from "lucide-react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const VerifyProfileModal = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden rounded-[20px] bg-white text-center">
        {/* Customized Header with title inside */}
        <div className="flex flex-col items-center pt-10 pb-2 relative">
          <div className="flex flex-col lg:flex-row items-center gap-3 justify-center w-full mt-4">
            <div className="bg-blue-100 rounded-xl p-2 animate-pulse">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a4b9e]">Verificar perfil</h2>
          </div>
        </div>

        <div className="p-8 pb-12 flex flex-col items-center">
          <label className="flex flex-col items-center justify-center w-[280px] h-[160px] rounded-[14px] border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
            <CloudUpload className="h-10 w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-[15px] font-semibold text-gray-600">Subir Documento</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </DialogContent>
    </Dialog>
  )
}