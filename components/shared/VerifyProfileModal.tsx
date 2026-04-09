import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ShieldCheck, CloudUpload } from "lucide-react"

const VerifyProfileModal = () => {
    return (
        <Dialog>

            <DialogContent className="lg:w-110 lg:h-85 md:w-120 md:h-80 w-68 overflow-hidden rounded-4xl bg-white text-center">
                <div className="flex flex-col items-center  relative">
                    <div className="flex items-center gap-3 w-full">
                        <div className="bg-blue-100 rounded-xl md:p-2 p-1.5 animate-pulse">
                            <ShieldCheck className="lg:h-8 lg:w-8 w-7 h-8 text-blue-700" strokeWidth={1.5}/>
                        </div>
                        <DialogTitle className="md:text-2xl text-[20px] font-bold text-[#1a4b9e]">Verificar perfil</DialogTitle>
                    </div>
                </div>

                <div className=" flex flex-col items-center">
                    <label className="flex flex-col items-center justify-center lg:w-92.5 lg:h-47.5 md:w-100 w-55 h-35 rounded-[14px] border border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
                        <CloudUpload className="lg:h-12 lg:w-12 w-20 h-9 text-blue-700 mb-3 group-hover:scale-108 transition-transform " strokeWidth={1.5} />
                        <span className="text-[17px] font-semibold text-gray-600">Subir Documento</span>
                        <input type="file" className="hidden" />
                    </label>
                </div>
            </DialogContent>

        </Dialog>
    )
}

export default VerifyProfileModal