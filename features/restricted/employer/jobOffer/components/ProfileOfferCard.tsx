"use client";
import { useState } from "react";
import { JobOfferDTO } from "../types/jobOffer.types";
import { Edit, Trash2, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateJobOfferStatus } from "../service/jobOffer.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  offer: JobOfferDTO;
  imageUrl?: string;
}

export const ProfileOfferCard = ({ offer, imageUrl }: Props) => {
  const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;
  const [isChanging, setIsChanging] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isActive = offer.status === "ACTIVE";

  const confirmDelete = async () => {
    if (!offerId) return;
    setIsDeleting(true);
    try {
      await updateJobOfferStatus(offerId, "DELETED");
      toast.success("Oferta eliminada correctamente");
      window.location.reload(); 
    } catch (error: any) {
      toast.error(error.message || "No se pudo eliminar la oferta");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!offerId || isChanging) return;
    setIsChanging(true);
    const newStatus = isActive ? "DISABLED" : "ACTIVE";
    try {
      await updateJobOfferStatus(offerId, newStatus);
      toast.success(`Oferta ${isActive ? "desactivada" : "activada"} correctamente`);
      window.location.reload(); 
    } catch (error: any) {
      toast.error(error.message || "Error al cambiar estado");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 w-full shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
      {/* Imagen / Siglas */}
      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shrink-0 border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner">
        {imageUrl ? (
          <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#34c759] to-[#28a745] flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>
      
      {/* Detalles */}
      <div className="flex flex-col flex-1 pb-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-black text-[#1a3683] text-lg leading-tight line-clamp-1 group-hover:text-[#2552d0] transition-colors">{offer.title}</h3>
            
            {/* Toggle Status Rediseñado */}
            <div className="mt-2.5 flex items-center gap-3">
              <button
                onClick={handleToggleStatus}
                disabled={isChanging}
                className={`relative flex items-center h-7 w-[100px] rounded-full border-2 transition-all duration-300 shadow-sm active:scale-95 ${
                  isActive 
                    ? "border-[#34c759]/30 bg-[#f0fff4]" 
                    : "border-orange-200 bg-orange-50"
                }`}
              >
                <div
                  className={`absolute w-5 h-5 rounded-full transition-all duration-500 shadow-md transform ${
                    isActive ? "bg-[#34c759] translate-x-1" : "bg-orange-500 translate-x-[74px]"
                  }`}
                ></div>
                <span 
                  className={`w-full text-center text-[10px] font-black uppercase tracking-tighter z-10 transition-colors ${
                    isActive ? "text-[#2d8a43] ml-4" : "text-orange-700 mr-5"
                  }`}
                >
                  {isActive ? "Activa" : "Pausa"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-[#1a4b9e] transition-all border border-transparent hover:border-blue-100 active:scale-90">
              <Edit size={18} />
            </Link>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 active:scale-90"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Info adicional con chips */}
        <div className="mt-5 pt-4 border-t border-gray-50 flex flex-wrap justify-between items-end gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[13px] font-bold text-gray-600">
              <MapPin size={14} className="text-[#1a4b9e]" />
              <span className="truncate max-w-[140px]">{offer.establishment_address || offer.establishmentAddress}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Sueldo Estimado</span>
            <div className="flex items-center gap-1.5 text-[#1a3683] font-black text-lg">
              <span className="text-sm opacity-60">$</span>
              <span>{Number(offer.salary).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md rounded-[24px] border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-white px-8 pt-8 pb-8 flex flex-col items-center text-center">
            
            {/* Animated Icon Circle */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 bg-red-300 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30"></div>
              <Trash2 className="text-red-500 w-8 h-8 relative z-10" />
            </div>

            <DialogHeader className="w-full flex flex-col items-center">
              <DialogTitle className="text-2xl font-black text-[#1a4b9e] mb-2">
                Eliminar Oferta
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-medium text-[15px] leading-relaxed max-w-[280px]">
                Estás a punto de borrar la oferta <br/>
                <strong className="text-gray-800 font-bold block mt-1 line-clamp-2">&quot;{offer.title}&quot;</strong>
                <span className="block mt-4 text-xs text-red-500 font-semibold bg-red-50 px-3 py-1.5 rounded-full">Acción irreversible</span>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-8 flex w-full gap-3 flex-col-reverse sm:flex-row">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting} className="rounded-full flex-1 font-bold text-gray-500 hover:text-[#1a4b9e] hover:bg-blue-50 hover:border-[#1a4b9e]/30 border-gray-200 h-11 transition-all">
                Cancelar
              </Button>
              <Button onClick={confirmDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 text-white rounded-full flex-1 font-bold shadow-sm border-none h-11 transition-all hover:-translate-y-0.5">
                {isDeleting ? "Eliminando..." : "Sí, eliminar"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
