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
  onStatusChange?: () => void;
  isPremium?: boolean;
}

export const ProfileOfferCard = ({ offer, imageUrl, businessName, onStatusChange, isPremium = false }: Props) => {
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
      onStatusChange?.(); 
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
      onStatusChange?.(); 
    } catch (error: any) {
      toast.error(error.message || "Error al cambiar estado");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className={`group relative rounded-2xl p-4 sm:p-5 lg:p-6 flex sm:flex-row gap-5 lg:gap-6 w-full transition-all duration-300 overflow-hidden ${
      isPremium
        ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-1'
        : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
    }`}>
      {/* Background Glow (solo premium) */}
      {isPremium && (
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-blue-500/10 to-green-500/10 blur-3xl rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      )}

      {/* Imagen / Siglas */}
      <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center transition-transform duration-500 mx-auto sm:mx-0 group-hover:scale-105 ${
        isPremium
          ? 'bg-linear-to-br from-white to-gray-50/50 shadow-lg shadow-black/5 border border-white/80'
          : 'bg-gray-50 border border-gray-100 shadow-inner'
      }`}>
        {imageUrl ? (
          <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center capitalize text-3xl lg:text-4xl font-black ${
            isPremium
              ? 'bg-linear-to-br from-blue-600 to-green-500 text-white'
              : 'bg-green-600 text-white'
          }`}>
            {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>
      
      {/* Detalles */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-base sm:text-lg lg:text-xl leading-tight line-clamp-1 capitalize transition-colors ${
              isPremium
                ? 'text-gray-900 group-hover:text-blue-600'
                : 'text-gray-900 group-hover:text-green-600'
            }`}>{offer.title}</h3>
            
            {/* Ubicación */}
            <div className="mt-2.5 flex items-center gap-2 font-medium text-xs">
              <MapPin size={14} className={`shrink-0 ${isPremium ? 'text-blue-500' : 'text-green-500'}`} />
              <span className="text-gray-500 truncate tracking-tight capitalize">{offer.establishment_address || offer.establishmentAddress || "Ubicación no especificada"}</span>
            </div>
          </div>

          <div className="flex gap-2 lg:gap-3 shrink-0 self-end sm:self-start">
            <Link href={`/empleador/ofertas/${offerId}/editar`} className={`p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all ${
              isPremium
                ? 'bg-white/80 border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md'
                : 'bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 shadow-sm'
            }`}>
              <Edit size={16} className="sm:w-4.5 sm:h-4.5" />
            </Link>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className={`p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all ${
                isPremium
                  ? 'bg-white/80 border border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-200 hover:shadow-md'
                  : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 shadow-sm'
              }`}
            >
              <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>

        {/* Footer Area with Switch and Price */}
        <div className={`mt-auto pt-4 lg:pt-5 flex flex-wrap justify-between items-center gap-4 border-t ${
          isPremium ? 'border-gray-200/50' : 'border-gray-50'
        }`}>
          {/* Status Toggle */}
          <button
            onClick={handleToggleStatus}
            disabled={isChanging}
            className={`relative flex items-center h-8 sm:h-9 lg:h-10 w-28 sm:w-32 lg:w-36 rounded-full border-2 transition-all duration-500 px-1.5 ${
              isActive 
                ? (isPremium ? "bg-blue-50 border-blue-100" : "bg-green-50 border-green-100") 
                : "bg-orange-50 border-orange-100"
            }`}
          >
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full transition-all duration-500 shadow-md ${
                isActive 
                  ? (isPremium ? "bg-blue-500 translate-x-18 sm:translate-x-21 lg:translate-x-[96px]" : "bg-green-500 translate-x-[72px] sm:translate-x-[84px] lg:translate-x-[96px]")
                  : "bg-orange-500 translate-x-0"
              }`}
            />
            <span className={`absolute w-full text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-500 ${
              isActive 
                ? (isPremium ? "text-blue-600 left-[-12px] sm:left-[-15px] lg:left-[-18px]" : "text-green-600 left-[-12px] sm:left-[-15px] lg:left-[-18px]") 
                : "text-orange-600 left-[12px] sm:left-[15px] lg:left-[18px]"
            }`}>
              {isActive ? "Activa" : "Inactiva"}
            </span>
          </button>

          <div className="text-right">
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5 lg:mb-1">Sueldo</span>
            <span className={`font-black text-base sm:text-lg lg:text-xl tracking-tight ${
              isPremium ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500' : 'text-green-600'
            }`}>
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
