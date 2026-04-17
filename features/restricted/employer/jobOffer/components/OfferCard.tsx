"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
import { RequirementChips } from "./RequirementChips";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { updateJobOfferStatus } from "../service/jobOffer.service";

interface Props {
  offer: JobOfferDTO;
}

export const OfferCard = ({ offer }: Props) => {
  const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;

  const [isChanging, setIsChanging] = useState(false);
  const isActive = offer.status === "ACTIVE";

  const handleDelete = async () => {
    if (!offerId) return;
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar la oferta "${offer.title}"?`)) {
      try {
        await updateJobOfferStatus(offerId, "DELETED");
        toast.success("Oferta eliminada correctamente");
        window.location.reload(); 
      } catch (error: any) {
        toast.error(error.message || "No se pudo eliminar la oferta");
      }
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
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
      {/* Columna Izquierda: Imagen */}
      <div className="flex flex-col gap-3 w-full md:w-36 shrink-0">
        <div className="w-full h-36 bg-gray-300 rounded-xl"></div>
      </div>

      {/* Columna Central: Detalles */}
      <div className="flex-1 flex flex-col pt-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-[#143285] leading-tight">{offer.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm font-semibold">
              <span className="text-green-600 flex items-center gap-1">
                <MapPin size={14} className="shrink-0" />
                <span className="truncate max-w-[150px] inline-block">{offer.establishment_address || offer.establishmentAddress}</span>
              </span>
              <span className="text-blue-600 flex items-center gap-1">
                <span className="text-base rounded-full border border-blue-600 bg-blue-50 w-4 h-4 flex items-center justify-center font-bold text-[10px]">$</span>
                {offer.salary.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Status y Botones móviles/escritorio (top right) */}
          <div className="flex items-center gap-4">
            {/* Custom Toggle Switch */}
            <button
              onClick={handleToggleStatus}
              disabled={isChanging}
              className={`relative flex items-center h-8 w-28 rounded-full border p-1 transition-colors ${
                isActive
                  ? "border-[#34c759] bg-[#eaffe9] cursor-pointer"
                  : "border-orange-500 bg-orange-50 cursor-pointer"
              }`}
            >
              <div
                className={`absolute w-6 h-6 rounded-full transition-all duration-300 shadow-sm ${
                  isActive ? "bg-[#34c759] left-1" : "bg-orange-500 left-[82px]"
                }`}
              ></div>
              <span 
                className={`w-full text-center text-xs font-bold z-10 transition-colors ${
                  isActive ? "text-[#34c759] ml-4" : "text-orange-600 mr-4"
                }`}
              >
                {isActive ? "Activa" : "Inactiva"}
              </span>
            </button>
            <Link href={`/empleador/ofertas/${offerId}/editar`}>
               <Pencil size={22} className="text-gray-600 hover:text-blue-600 cursor-pointer" />
            </Link>
            <Trash2 
               size={22} 
               className="text-red-500 hover:text-red-700 cursor-pointer" 
               onClick={handleDelete}
            />
          </div>
        </div>

        {/* Pilas de Horario */}
        <div className="flex gap-3 my-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold">
             {/* Icono de reloj opcional */}
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible"}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500 bg-green-50 text-green-600 text-xs font-semibold">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
             {(offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana"}
          </span>
        </div>

        {/* Descripción (Truncada a 2 líneas aproximadas) */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {offer.description || (offer as any).dutiesDescription || "Se propone la creación del cargo para garantizar atención continua a los huéspedes durante la noche, fortalecer la seguridad y optimizar los procesos administrativos ..."}
        </p>

        {/* Requisitos y Botón */}
        <div className="flex justify-between items-end mt-auto">
          <div className="flex gap-2 flex-wrap">
            {offer.requirements?.slice(0, 3).map((req: any, index) => (
              <span key={index} className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs font-medium">
                {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
              </span>
            ))}
          </div>
          
          <Link
            href={`/empleador/ofertas/${offerId}`}
            className="bg-[#1f42ad] hover:bg-[#143285] text-white px-8 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ml-4 shrink-0"
          >
            Ver oferta
          </Link>
        </div>
      </div>
    </div>
  );
};