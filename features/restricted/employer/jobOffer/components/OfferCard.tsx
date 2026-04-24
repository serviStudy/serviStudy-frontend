"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
import { RequirementChips } from "./RequirementChips";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, MapPin, Sparkles, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
  onRefresh?: () => void;
}

export const OfferCard = ({ offer, imageUrl, onRefresh }: Props) => {
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
      if (onRefresh) onRefresh(); else window.location.reload();
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
      if (onRefresh) onRefresh(); else window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Error al cambiar estado");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-[2.5rem] border border-gray-100 p-6 flex flex-col sm:flex-row gap-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden w-full"
    >
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-[0.03] pointer-events-none" />
      
      {/* Brand accent line with Glow */}
      <div className={`absolute left-0 top-0 bottom-0 w-2 transition-all duration-500 ${isActive ? 'bg-[#28a745] shadow-[2px_0_10px_rgba(40,167,69,0.2)]' : 'bg-orange-400 shadow-[2px_0_10px_rgba(251,146,60,0.2)]'}`} />

      {/* Columna Izquierda: Imagen with Glass Effect */}
      <div className="flex flex-col gap-3 w-28 h-28 sm:w-[180px] sm:h-[180px] shrink-0 relative">
        <div className="w-full h-full bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-1 transition-transform duration-500">
          {imageUrl ? (
            <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#28a745] to-[#1e7e34] flex items-center justify-center text-white text-3xl sm:text-[64px] font-black shadow-lg">
              {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
            </div>
          )}
        </div>
      </div>

      {/* Columna Central: Detalles */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-black text-black leading-tight mb-2 truncate group-hover:text-green-800 transition-colors">{offer.title}</h3>
            
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 shadow-sm">
                <MapPin size={16} className="shrink-0 text-[#28a745]" />
                <span className="truncate max-w-[150px]">{offer.establishment_address || offer.establishmentAddress}</span>
              </div>
              <div className="text-[#28a745] flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">
                <span className="text-sm font-black">$</span>
                <span className="text-base">{offer.salary?.toLocaleString() ?? "0"}</span>
              </div>
            </div>
          </div>
          
          {/* Status y Botones (Top Right) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop: Modern Toggle Switch */}
            <button
              onClick={handleToggleStatus}
              disabled={isChanging}
              className={`hidden md:flex relative items-center h-10 w-[120px] rounded-full border transition-all duration-500 shadow-sm active:scale-95 px-1.5 ${
                isActive
                  ? "border-green-100 bg-green-50/50"
                  : "border-orange-100 bg-orange-50/50"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full transition-all duration-500 shadow-md transform flex items-center justify-center ${
                  isActive ? "bg-[#28a745] translate-x-[72px]" : "bg-orange-500 translate-x-0"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className={`absolute w-full text-center text-[11px] font-black uppercase tracking-wider z-10 transition-all duration-500 ${isActive ? "text-[#1e7e34] left-[-15px]" : "text-orange-900 left-[15px]"}`}>
                {isActive ? "Activa" : "Inactiva"}
              </span>
            </button>
            
            <div className="flex items-center gap-1">
              <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2.5 rounded-2xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-[#28a745] transition-all border border-transparent hover:border-green-100 active:scale-90 shadow-sm">
                 <Pencil size={20} />
              </Link>
              <button onClick={() => setShowDeleteModal(true)} className="p-2.5 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 active:scale-90 shadow-sm">
                 <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Pilas de Horario with modern icons */}
        <div className="flex flex-wrap gap-3 my-6">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-50/50 text-orange-600 text-[11px] font-black uppercase tracking-widest border border-orange-100 shadow-sm"
          >
             <Clock size={14} />
             {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible"}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-green-50/50 text-[#28a745] text-[11px] font-black uppercase tracking-widest border border-green-100 shadow-sm"
          >
             <Calendar size={14} />
             {(offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana"}
          </motion.span>
        </div>

        {/* Descripción */}
        <p className="hidden sm:block text-[15px] text-black/80 font-medium mb-6 line-clamp-2 leading-relaxed max-w-[90%]">
          {offer.description || (offer as any).dutiesDescription || "Sin descripción disponible."}
        </p>

        {/* Requisitos y Botón */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
          <div className="flex gap-2 flex-wrap">
            {offer.requirements?.slice(0, 3).map((req: any, index) => (
              <span key={index} className="bg-gray-50 border border-gray-100 text-black px-3.5 py-1.5 rounded-2xl text-[11px] font-bold shadow-sm">
                {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
              </span>
            ))}
          </div>
          
          <Link
            href={`/empleador/ofertas/${offerId}`}
            className="bg-[#28a745] hover:bg-[#1e7e34] text-white px-8 py-3 rounded-full text-sm font-black transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 shrink-0 uppercase tracking-widest"
          >
            Ver oferta
          </Link>
        </div>
      </div>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md rounded-[32px] border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
          <div className="relative p-8 flex flex-col items-center text-center">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
            
            {/* Warning Icon with Premium Animation */}
            <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mb-6 relative group/icon">
              <div className="absolute inset-0 bg-red-200/40 rounded-[2rem] animate-ping opacity-20" />
              <div className="absolute inset-0 bg-red-100/60 rounded-[2rem] group-hover:scale-110 transition-transform duration-500" />
              <Trash2 className="text-red-500 w-9 h-9 relative z-10 group-hover:rotate-6 transition-transform" />
            </div>

            <DialogHeader className="w-full">
              <DialogTitle className="text-2xl font-black text-black mb-3">
                ¿Eliminar oferta?
              </DialogTitle>
              <DialogDescription className="text-black/60 font-medium text-[16px] leading-relaxed px-4">
                Estás a punto de borrar permanentemente la oferta de empleo:
                <span className="block mt-2 text-black font-black text-lg">&quot;{offer.title}&quot;</span>
                <span className="inline-block mt-6 px-4 py-1.5 bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-full border border-red-100">
                  Esta acción es irreversible
                </span>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-10 flex w-full gap-4 flex-col sm:flex-row">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(false)} 
                disabled={isDeleting} 
                className="rounded-full flex-1 font-black text-black hover:bg-gray-50 border-gray-200 h-12 transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Cancelar
              </Button>
              <Button 
                onClick={confirmDelete} 
                disabled={isDeleting} 
                className="bg-red-500 hover:bg-red-600 text-white rounded-full flex-1 font-black shadow-lg shadow-red-500/25 h-12 transition-all active:scale-95 hover:-translate-y-0.5 uppercase tracking-widest text-xs border-none"
              >
                {isDeleting ? "Eliminando..." : "Eliminar ahora"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};