"use client";
import { useState } from "react";
import { JobOfferDTO } from "../types/jobOffer.types";
import { Edit, Trash2, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  businessName?: string;
}

export const ProfileOfferCard = ({ offer, imageUrl, businessName }: Props) => {
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
    <div className="group bg-white rounded-3xl lg:rounded-[32px] border border-gray-100 p-4 lg:p-6 flex flex-col sm:flex-row gap-4 lg:gap-6 w-full shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
      {/* Imagen / Siglas */}
      <div className="w-20 h-20 lg:w-28 lg:h-28 bg-gray-50 rounded-2xl lg:rounded-[28px] shrink-0 border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner transition-transform duration-500 mx-auto sm:mx-0">
        {imageUrl ? (
          <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
        ) : (
          <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-3xl lg:text-4xl font-black">
            {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>
      
      {/* Detalles */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-gray-900 text-xl lg:text-2xl leading-tight line-clamp-1 transition-colors group-hover:text-green-600">{offer.title}</h3>
            
            {/* Ubicación */}
            <div className="mt-2 flex items-center gap-2 text-gray-400 font-bold text-sm">
              <MapPin size={16} className="text-green-500 shrink-0" />
              <span className="truncate tracking-tight">{offer.establishment_address || offer.establishmentAddress || "Ubicación no especificada"}</span>
            </div>
          </div>

          <div className="flex gap-2 lg:gap-3 shrink-0 self-end sm:self-start">
            <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2.5 lg:p-3 rounded-xl lg:rounded-2xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all shadow-sm">
              <Edit size={18} />
            </Link>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="p-2.5 lg:p-3 rounded-xl lg:rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Footer Area with Switch and Price */}
        <div className="mt-auto pt-4 lg:pt-5 flex flex-wrap justify-between items-center gap-4 border-t border-gray-50">
          {/* Status Toggle */}
          <button
            onClick={handleToggleStatus}
            disabled={isChanging}
            className={`relative flex items-center h-8 lg:h-10 w-28 lg:w-32 rounded-full border-2 transition-all duration-500 px-1.5 ${
              isActive ? "bg-green-50 border-green-100" : "bg-gray-50 border-gray-100"
            }`}
          >
            <div
              className={`w-5 h-5 lg:w-7 lg:h-7 rounded-full transition-all duration-500 shadow-lg ${
                isActive ? "bg-green-500 translate-x-[72px] lg:translate-x-[84px]" : "bg-gray-300 translate-x-0"
              }`}
            />
            <span className={`absolute w-full text-center text-[9px] lg:text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 ${isActive ? "text-green-600 left-[-12px] lg:left-[-15px]" : "text-gray-400 left-[12px] lg:left-[15px]"}`}>
              {isActive ? "Activa" : "Inactiva"}
            </span>
          </button>

          <div className="text-right">
            <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5 lg:mb-1">Sueldo</span>
            <span className="text-green-600 font-black text-xl lg:text-2xl tracking-tighter">
              ${Number(offer.salary).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AnimatePresence>
          {showDeleteModal && (
            <DialogContent className="sm:max-w-[400px] rounded-xl border border-gray-200 shadow-xl p-0 overflow-hidden bg-white outline-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative p-8 flex flex-col items-center justify-center text-center"
              >
                {/* Icon Section */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-red-50 rounded-xl flex items-center justify-center relative group/icon">
                    <Trash2 className="text-red-500 w-8 h-8 relative z-10 transition-transform duration-500" />
                  </div>
                </div>

                <div className="space-y-3 w-full">
                  <h3 className="text-2xl font-bold text-blue-900 tracking-tight">
                    Confirmar baja
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium text-sm">
                      ¿Estás seguro de que deseas eliminar la oferta?
                    </p>
                    <div className="py-2.5 px-4 bg-gray-50 rounded-xl border border-gray-200 inline-block max-w-full">
                      <span className="text-blue-900 font-bold text-base block truncate">"{offer.title}"</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-red-100">
                      Operación permanente
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDeleteModal(false)} 
                    disabled={isDeleting} 
                    className="rounded-xl font-bold text-gray-700 hover:bg-gray-50 border-gray-200 h-12 transition-all active:scale-95 text-sm order-2 sm:order-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={confirmDelete} 
                    disabled={isDeleting} 
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-sm h-12 transition-all active:scale-95 text-sm order-1 sm:order-2"
                  >
                    {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                  </Button>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
};
