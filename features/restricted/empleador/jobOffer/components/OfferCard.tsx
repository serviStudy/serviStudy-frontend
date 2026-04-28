"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-[48px] border border-gray-50 p-8 flex flex-col lg:flex-row gap-10 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 relative overflow-hidden w-full"
    >
      {/* Brand accent line with Glow */}
      <div className={`absolute left-0 top-0 bottom-0 w-3 transition-all duration-700 ${isActive ? 'bg-green-600 shadow-[4px_0_20px_rgba(22,163,74,0.3)]' : 'bg-orange-400 shadow-[4px_0_20px_rgba(251,146,60,0.3)]'}`} />

      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

      {/* Left Column: Image with Premium Frame */}
      <div className="relative shrink-0 mx-auto lg:mx-0">
        <div className="w-32 h-32 lg:w-48 lg:h-48 bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700">
          {imageUrl ? (
            <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 flex items-center justify-center text-white text-5xl lg:text-8xl font-black shadow-lg">
              {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
            </div>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter mb-4 truncate group-hover:text-green-600 transition-colors duration-300">
              {offer.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-500 font-bold shadow-sm group-hover:bg-white transition-colors">
                <MapPin size={20} className="shrink-0 text-green-500" />
                <span className="truncate max-w-[200px] tracking-tight">{offer.establishment_address || offer.establishmentAddress}</span>
              </div>
              <div className="text-green-600 flex items-center gap-2 bg-green-50 px-5 py-2.5 rounded-2xl border border-green-100 shadow-sm">
                <span className="text-sm font-black uppercase tracking-widest opacity-60">Sueldo</span>
                <span className="text-2xl font-black tracking-tighter">${Number(offer.salary).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0 self-end md:self-start">
             {/* Status Switch */}
             <button
              onClick={handleToggleStatus}
              disabled={isChanging}
              className={`flex relative items-center h-12 w-36 rounded-full border-2 transition-all duration-700 shadow-sm active:scale-95 px-2 ${
                isActive
                  ? "border-green-100 bg-green-50/50"
                  : "border-orange-100 bg-orange-50/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full transition-all duration-700 shadow-lg transform flex items-center justify-center ${
                  isActive ? "bg-green-600 translate-x-[92px]" : "bg-orange-500 translate-x-0"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
              <span className={`absolute w-full text-center text-[11px] font-black uppercase tracking-[0.15em] z-10 transition-all duration-700 ${isActive ? "text-green-700 left-[-15px]" : "text-orange-900 left-[15px]"}`}>
                {isActive ? "Activa" : "Pausada"}
              </span>
            </button>
            
            <div className="flex items-center gap-2 relative z-10">
              <Link href={`/empleador/ofertas/${offerId}/editar`} className="relative z-10 p-4 rounded-2xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all border border-transparent hover:border-green-100 shadow-sm active:scale-90 cursor-pointer">
                 <Pencil size={22} />
              </Link>
              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteModal(true); }} className="relative z-10 p-4 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm active:scale-90 cursor-pointer">
                 <Trash2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Tags */}
        <div className="flex flex-wrap gap-3 my-8">
           {[
             { icon: Clock, label: (offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible", color: "text-orange-600 bg-orange-50 border-orange-100" },
             { icon: Calendar, label: (offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana", color: "text-green-600 bg-green-50 border-green-100" }
           ].map((tag, i) => (
             <div key={i} className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[12px] uppercase tracking-widest border shadow-sm ${tag.color}`}>
                <tag.icon size={16} />
                {tag.label}
             </div>
           ))}
        </div>

        {/* Requirements & Link */}
        <div className="mt-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-50">
          <div className="flex gap-3 flex-wrap justify-center md:justify-start">
            {offer.requirements?.slice(0, 4).map((req: any, index) => (
              <span key={index} className="bg-white border border-gray-100 text-gray-500 px-5 py-2 rounded-2xl text-[12px] font-black uppercase tracking-wider shadow-sm group-hover:border-green-100 transition-colors">
                {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
              </span>
            ))}
          </div>
          
          <Link
            href={`/empleador/ofertas/${offerId}`}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-3xl text-sm font-black transition-all shadow-2xl shadow-green-900/20 hover:shadow-green-900/40 hover:-translate-y-1 text-center uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 group/btn"
          >
            Ver Detalle Completo
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Delete Modal Re-styled to match */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md rounded-[48px] border border-gray-50 shadow-2xl p-0 overflow-hidden bg-white outline-none">
          <div className="relative p-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-red-50 rounded-[32px] flex items-center justify-center mb-8 relative group/icon shadow-inner">
              <div className="absolute inset-0 bg-red-200/40 rounded-[32px] animate-ping opacity-20" />
              <Trash2 className="text-red-500 w-10 h-10 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
            </div>

            <DialogHeader className="w-full">
              <DialogTitle className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                ¿Eliminar oferta?
              </DialogTitle>
              <DialogDescription className="text-gray-400 font-bold text-lg leading-relaxed px-4">
                Estás a punto de borrar permanentemente:
                <span className="block mt-3 text-red-600 font-black text-2xl tracking-tighter">&quot;{offer.title}&quot;</span>
                <span className="inline-block mt-8 px-6 py-2 bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-full border border-red-100">
                  Acción irreversible
                </span>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-12 flex w-full gap-4 flex-col sm:flex-row">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(false)} 
                disabled={isDeleting} 
                className="rounded-3xl flex-1 font-black text-gray-400 hover:bg-gray-50 border-gray-100 h-16 transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Cancelar
              </Button>
              <Button 
                onClick={confirmDelete} 
                disabled={isDeleting} 
                className="bg-red-500 hover:bg-red-600 text-white rounded-3xl flex-1 font-black shadow-2xl shadow-red-500/30 h-16 transition-all active:scale-95 hover:-translate-y-1 uppercase tracking-widest text-xs border-none"
              >
                {isDeleting ? "Eliminando..." : "Eliminar Ahora"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};