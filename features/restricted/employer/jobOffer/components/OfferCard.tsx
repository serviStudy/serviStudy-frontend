"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
import { RequirementChips } from "./RequirementChips";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, MapPin } from "lucide-react";
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
    <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col md:flex-row gap-6 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300">
      {/* Columna Izquierda: Imagen */}
      <div className="flex flex-col gap-3 w-full md:w-[140px] shrink-0">
        <div className="w-full h-[140px] bg-gray-50 rounded-[20px] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner">
          {imageUrl ? (
            <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-[#34c759] flex items-center justify-center text-white text-[56px] font-bold">
              {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
            </div>
          )}
        </div>
      </div>

      {/* Columna Central: Detalles */}
      <div className="flex-1 flex flex-col justify-between pt-1">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-[22px] font-extrabold text-[#1a4b9e] leading-tight mb-1.5">{offer.title}</h3>
            <div className="flex items-center gap-4 text-sm font-semibold">
              <span className="text-gray-500 flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0 text-gray-400" />
                <span className="truncate max-w-[150px] inline-block">{offer.establishment_address || offer.establishmentAddress}</span>
              </span>
              <span className="text-[#1a4b9e] flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg">
                <span className="text-base rounded-full border border-[#1a4b9e]/30 bg-white w-4 h-4 flex items-center justify-center font-bold text-[10px]">$</span>
                {offer.salary.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Status y Botones móviles/escritorio (top right) */}
          <div className="flex items-center gap-3">
            {/* Custom Toggle Switch */}
            <button
              onClick={handleToggleStatus}
              disabled={isChanging}
              className={`relative flex items-center h-8 w-28 rounded-full border border-transparent p-1 transition-all shadow-sm ${
                isActive
                  ? "bg-green-100 hover:bg-green-200 cursor-pointer"
                  : "bg-orange-100 hover:bg-orange-200 cursor-pointer"
              }`}
            >
              <div
                className={`absolute w-6 h-6 rounded-full transition-all duration-300 shadow-sm ${
                  isActive ? "bg-[#34c759] left-1" : "bg-orange-500 left-[84px]"
                }`}
              ></div>
              <span 
                className={`w-full text-center text-xs font-bold z-10 transition-colors ${
                  isActive ? "text-green-700 ml-4" : "text-orange-700 mr-4"
                }`}
              >
                {isActive ? "Activa" : "Inactiva"}
              </span>
            </button>
            
            <div className="flex items-center gap-1 ml-2">
              <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
                 <Pencil size={20} />
              </Link>
              <button onClick={() => setShowDeleteModal(true)} className="p-2 rounded-full hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors cursor-pointer">
                 <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Pilas de Horario */}
        <div className="flex gap-2.5 my-4">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-600 text-xs font-bold">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible"}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eaffe9] text-[#2ebd4f] text-xs font-bold">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
             {(offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana"}
          </span>
        </div>

        {/* Descripción (Truncada a 2 líneas aproximadas) */}
        <p className="text-sm text-gray-500/90 mb-5 line-clamp-2 leading-relaxed">
          {offer.description || (offer as any).dutiesDescription || "Rol enfocado en ejecutar y optimizar operaciones internas con orientación a resultados."}
        </p>

        {/* Requisitos y Botón */}
        <div className="flex justify-between items-end mt-auto pt-2">
          <div className="flex gap-2 flex-wrap">
            {offer.requirements?.slice(0, 3).map((req: any, index) => (
              <span key={index} className="bg-blue-50/80 border border-blue-100 text-[#1a4b9e] px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide">
                {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
              </span>
            ))}
            {offer.requirements && offer.requirements.length > 3 && (
              <span className="bg-gray-50 border border-gray-100 text-gray-500 px-3 py-1.5 rounded-xl text-xs font-bold">
                +{offer.requirements.length - 3}
              </span>
            )}
          </div>
          
          <Link
            href={`/empleador/ofertas/${offerId}`}
            className="bg-[#1a4b9e] hover:bg-[#153472] text-white px-7 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ml-4 shrink-0"
          >
            Ver oferta
          </Link>
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