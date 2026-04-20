"use client";
import { useState } from "react";
import { JobOfferDTO } from "../types/jobOffer.types";
import { Edit, Trash2, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateJobOfferStatus } from "../service/jobOffer.service";

interface Props {
  offer: JobOfferDTO;
}

export const ProfileOfferCard = ({ offer }: Props) => {
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
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 w-full shadow-sm hover:shadow-md transition-shadow">
      {/* Imagen */}
      <div className="w-16 h-16 bg-gray-400 rounded-sm shrink-0"></div>
      
      {/* Detalles */}
      <div className="flex flex-col flex-1 pb-1">
        <div className="flex justify-between items-start">
          <div className="text-[#1a3683]">
            <h3 className="font-bold text-base leading-tight line-clamp-2">{offer.title}</h3>
            {/* Toggle */}
            <button
              onClick={handleToggleStatus}
              disabled={isChanging}
              className={`mt-1.5 relative flex items-center h-6 w-24 rounded-full border transition-colors ${
                isActive ? "border-[#34c759] bg-[#eaffe9]" : "border-orange-500 bg-orange-50"
              }`}
            >
              <div
                className={`absolute w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
                  isActive ? "bg-[#34c759] left-1" : "bg-orange-500 left-18.5"
                }`}
              ></div>
              <span 
                className={`w-full text-center text-[10px] font-bold z-10 transition-colors ${
                  isActive ? "text-[#34c759] ml-3" : "text-orange-600 mr-3"
                }`}
              >
                {isActive ? "Activa" : "Desactivada"}
              </span>
            </button>
          </div>

          <div className="flex gap-3 text-red-500 shrink-0 ml-2">
            <Link href={`/empleador/ofertas/${offerId}/editar`} className="text-gray-800 hover:text-blue-600">
              <Edit size={18} />
            </Link>
            <Trash2 size={18} className="cursor-pointer hover:text-red-700" onClick={handleDelete} />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-3 flex justify-between items-center text-xs font-medium text-gray-700">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="truncate max-w-30">{offer.establishment_address || offer.establishmentAddress}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border border-gray-700 flex justify-center items-center text-[10px] font-bold">$</span>
            <span>{offer.salary.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
