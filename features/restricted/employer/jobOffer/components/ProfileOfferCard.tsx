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
    <div className="group bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 w-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
      {/* Imagen / Siglas */}
      <div className="w-24 h-24 bg-gray-50 rounded-2xl shrink-0 border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner group-hover:rotate-2 transition-transform duration-500">
        {imageUrl ? (
          <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
        ) : (
          <div className="w-full h-full bg-[#28a745] flex items-center justify-center text-white text-3xl font-black">
            {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>
      
      {/* Detalles */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-black text-black text-xl lg:text-2xl leading-tight line-clamp-1 transition-colors">{offer.title}</h3>
            
            {/* Ubicación */}
            <div className="mt-2 flex items-center gap-2 text-black/60 font-bold text-sm">
              <MapPin size={14} className="text-[#28a745]" />
              <span className="truncate">{offer.establishment_address || offer.establishmentAddress || "Ubicación no especificada"}</span>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-[#28a745] transition-all">
              <Edit size={18} />
            </Link>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Footer Area with Switch and Price */}
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
          {/* Status Toggle */}
          <button
            onClick={handleToggleStatus}
            disabled={isChanging}
            className={`relative flex items-center h-8 w-28 rounded-full border transition-all duration-300 px-1 ${
              isActive ? "bg-green-100 border-green-200" : "bg-gray-100 border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full transition-all duration-300 shadow-sm ${
                isActive ? "bg-[#28a745] translate-x-[76px]" : "bg-gray-400 translate-x-0"
              }`}
            />
            <span className={`absolute w-full text-center text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${isActive ? "text-green-700 left-[-12px]" : "text-gray-600 left-[12px]"}`}>
              {isActive ? "Activa" : "Inactiva"}
            </span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-bold text-black/40 uppercase block">Sueldo</span>
            <span className="text-[#28a745] font-black text-lg">
              ${Number(offer.salary).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AnimatePresence>
          {showDeleteModal && (
            <DialogContent className="sm:max-w-[420px] rounded-[40px] border-none shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl outline-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative p-10 flex flex-col items-center justify-center text-center"
              >
                {/* Top decorative gradient */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                
                {/* Icon Section */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center relative group/icon">
                    <div className="absolute inset-0 bg-red-400/20 rounded-[2.5rem] animate-ping opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-100/80 to-white rounded-[2.5rem] shadow-inner" />
                    <Trash2 className="text-red-500 w-10 h-10 relative z-10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500" />
                  </div>
                </div>

                <div className="space-y-4 w-full">
                  <h3 className="text-3xl font-black text-black tracking-tight">
                    Confirmar baja
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-black/50 font-medium text-base">
                      ¿Estás seguro de que deseas eliminar?
                    </p>
                    <div className="py-3 px-5 bg-gray-50/50 rounded-2xl border border-gray-100 inline-block max-w-full">
                      <span className="text-black font-black text-lg block truncate">&quot;{offer.title}&quot;</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="px-5 py-2 bg-red-50/50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-red-100/50">
                      Operación permanente
                    </span>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDeleteModal(false)} 
                    disabled={isDeleting} 
                    className="rounded-full font-black text-black hover:bg-gray-50 border-gray-100 h-14 transition-all active:scale-95 uppercase tracking-widest text-[10px] order-2 sm:order-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={confirmDelete} 
                    disabled={isDeleting} 
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full font-black shadow-[0_10px_30px_-5px_rgba(239,68,68,0.4)] h-14 transition-all active:scale-95 hover:-translate-y-1 uppercase tracking-widest text-[10px] border-none order-1 sm:order-2"
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
