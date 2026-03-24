"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, MapPin, Pencil, Trash2, CircleDollarSign } from "lucide-react"

export default function EditProfileModal({
  open,
  setOpen,
  nombre,
  setNombre,
  telefono,
  setTelefono,
  empresa,
  setEmpresa,
  direccion,
  setDireccion,
  descripcion,
  setDescripcion,
}: any) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-[1000px] p-0 bg-white sm:rounded-[20px] border-none [&>button]:hidden flex flex-col max-h-[95vh] overflow-y-auto w-full">
        
        {/* Banner Area (Light Green) */}
        <div className="h-[120px] w-full bg-[#e8fbe5] shrink-0 relative">
        </div>

        {/* Profile Info Container */}
        <div className="px-6 lg:px-10 relative pb-8">
          
          {/* Editable Avatar */}
          <div className="mt-[-48px] relative h-24 w-24 shrink-0 rounded-full bg-[#34c759] border-4 border-white flex items-center justify-center text-white text-[40px] font-bold shadow-sm">
            T
            <button 
              className="absolute right-0 bottom-0 bg-white rounded-full p-1.5 shadow-sm flex items-center justify-center"
              aria-label="Upload picture"
            >
              <Camera className="h-4 w-4 text-[#34c759]" strokeWidth={2.5} />
            </button>
          </div>

          {/* Form Content */}
          <div className="mt-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 text-[13px] lg:text-[14px]">Nombre Empleador</label>
                <Input 
                  className="rounded-[12px] border-gray-300 h-10 px-3 text-sm text-gray-500 shadow-none focus-visible:ring-1 focus-visible:ring-gray-300"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 text-[13px] lg:text-[14px]">Número de contacto</label>
                <Input 
                  className="rounded-[12px] border-gray-300 h-10 px-3 text-sm text-gray-500 shadow-none focus-visible:ring-1 focus-visible:ring-gray-300"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 text-[13px] lg:text-[14px]">Nombre del establecimiento</label>
                <Input 
                  className="rounded-[12px] border-gray-300 h-10 px-3 text-sm text-gray-500 shadow-none focus-visible:ring-1 focus-visible:ring-gray-300"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-gray-500 text-[13px] lg:text-[14px]">Dirección del establecimiento</label>
                <Input 
                  className="rounded-[12px] border-gray-300 h-10 px-3 text-sm text-gray-500 shadow-none focus-visible:ring-1 focus-visible:ring-gray-300"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-500 text-[13px] lg:text-[14px]">Resumen profesional</label>
              <Textarea 
                className="rounded-[12px] border-gray-300 min-h-[100px] resize-none p-3 text-sm text-gray-500 shadow-none focus-visible:ring-1 focus-visible:ring-gray-300"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <h3 className="text-[14px] lg:text-[15px] font-bold text-gray-500">Ofertas de trabajo disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 1 */}
                <div className="flex w-full flex-col p-3 rounded-[16px] border border-gray-200 bg-white">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 shrink-0 rounded bg-gray-500" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h5 className="text-[14px] font-bold leading-tight text-[#1a4b9e] w-24">Recepcionista nocturno</h5>
                        <div className="flex items-center gap-1.5">
                          <Pencil className="h-4 w-4 text-gray-500" strokeWidth={2} />
                          <Trash2 className="h-4 w-4 text-red-400" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="mt-1 flex justify-end">
                        <div className="flex items-center justify-between w-[55px] h-[18px] rounded-full bg-[#34c759] px-0.5">
                          <span className="text-[9px] font-bold text-white pl-1.5">Activa</span>
                          <div className="h-3.5 w-3.5 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#1a4b9e] font-bold mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-[#1a4b9e] font-bold">portal del quindio</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <CircleDollarSign className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-gray-500 font-bold">1.600.000</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex w-full flex-col p-3 rounded-[16px] border border-gray-200 bg-white">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 shrink-0 rounded bg-gray-500" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h5 className="text-[14px] font-bold leading-tight text-[#1a4b9e] w-full max-w-[160px] lg:max-w-[200px]">Programardor Front</h5>
                        <div className="flex items-center gap-1.5">
                          <Pencil className="h-4 w-4 text-gray-500" strokeWidth={2} />
                          <Trash2 className="h-4 w-4 text-red-400" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="mt-1 flex justify-end">
                        <div className="flex items-center justify-between w-[80px] h-[18px] rounded-full bg-[#ff9500] px-0.5">
                          <div className="h-3.5 w-3.5 rounded-full bg-white"></div>
                          <span className="text-[9px] font-bold text-white pr-1.5">Desactivada</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#1a4b9e] font-bold mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-[#1a4b9e] font-bold">portal del quindio</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <CircleDollarSign className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-gray-500 font-bold">1.600.000</span>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex w-full flex-col p-3 rounded-[16px] border border-gray-200 bg-white">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 shrink-0 rounded bg-gray-500" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h5 className="text-[14px] font-bold leading-tight text-[#1a4b9e] w-24">Recepcionista nocturno</h5>
                        <div className="flex items-center gap-1.5">
                          <Pencil className="h-4 w-4 text-gray-500" strokeWidth={2} />
                          <Trash2 className="h-4 w-4 text-red-400" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="mt-1 flex justify-end">
                        <div className="flex items-center justify-between w-[55px] h-[18px] rounded-full bg-[#34c759] px-0.5">
                          <span className="text-[9px] font-bold text-white pl-1.5">Activa</span>
                          <div className="h-3.5 w-3.5 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#1a4b9e] font-bold mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-[#1a4b9e] font-bold">portal del quindio</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <CircleDollarSign className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-gray-500 font-bold">1.600.000</span>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="flex w-full flex-col p-3 rounded-[16px] border border-gray-200 bg-white">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 shrink-0 rounded bg-gray-500" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h5 className="text-[14px] font-bold leading-tight text-[#1a4b9e] w-24">Programardor Front</h5>
                        <div className="flex items-center gap-1.5">
                          <Pencil className="h-4 w-4 text-gray-500" strokeWidth={2} />
                          <Trash2 className="h-4 w-4 text-red-400" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="mt-1 flex justify-end">
                        <div className="flex items-center justify-between w-[80px] h-[18px] rounded-full bg-[#ff9500] px-0.5">
                          <div className="h-3.5 w-3.5 rounded-full bg-white"></div>
                          <span className="text-[9px] font-bold text-white pr-1.5">Desactivada</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#1a4b9e] font-bold mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-[#1a4b9e] font-bold">portal del quindio</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <CircleDollarSign className="h-3.5 w-3.5 text-gray-700" strokeWidth={2.5} />
                      <span className="text-gray-500 font-bold">1.600.000</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => setOpen(false)}
                className="rounded-[12px] px-6 py-2.5 bg-[#e5e7eb] font-bold text-gray-600 hover:bg-gray-300 w-[140px]"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="rounded-[12px] px-6 py-2.5 bg-[#1a4b9e] font-bold text-white hover:bg-blue-800 w-[180px]"
              >
                Guardar Cambios
              </button>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}