"use client";
import { useState } from "react";
import { JobOfferDTO } from "../types/jobOffer.types";
import { Edit, Trash2, MapPin, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateJobOfferStatus } from "../service/jobOffer.service";
import { DeleteModal } from "./DeleteModal";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const isActive = offer.status === "ACTIVE";


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
    <div className={`group relative rounded-xl p-4 sm:p-5 lg:p-6 flex sm:flex-row gap-5 lg:gap-6 w-full transition-all duration-200 overflow-hidden ${
      isPremium
        ? 'bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-0.5'
        : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
    }`}>
      {/* Background Glow (solo premium) */}
      {isPremium && (
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-blue-500/10 to-green-500/10 blur-3xl rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      )}
      
      {/* Detalles */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
          <div className="flex gap-2 min-w-0">
            {/* Imagen / Siglas */}
            <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 rounded-xl shrink-0 overflow-hidden flex items-center justify-center transition-transform duration-500 mx-auto sm:mx-0 group-hover:scale-105 ${
              isPremium
                ? 'bg-linear-to-br from-white to-gray-50/50 shadow-lg shadow-black/5 border border-white/80'
                : 'bg-gray-50 border border-gray-100 shadow-inner'
            }`}>
              {imageUrl ? (
                <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover" />
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
            
            {/* Ubicación */}
            <div className="mt-0.5 items-center gap-0 font-medium lg:text-[8px]">
              <h3 className={`font-bold sm:text-lg lg:text-xl capitalize transition-colors text-gray-700`}>{offer.title}</h3>
              <div className="flex gap-1">
                <MapPin size={16} className="shrink-0 text-gray-400" />
                <span className="text-gray-400 text-[12px] md:text-sm truncate tracking-tight capitalize">{offer.establishment_address || offer.establishmentAddress || "Ubicación no especificada"}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 lg:gap-3 shrink-0 self-end sm:self-start mb-3">
            <Link href={`/empleador/ofertas/${offerId}/editar`}>
              <Button className={`p-2 sm:p-2.5 lg:p-3 transition-all ${
              isPremium
                ? 'bg-white/80 border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md'
                : 'bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 shadow-sm'
            }`}>
              <Edit size={16} className="sm:w-4.5 sm:h-4.5" />
              </Button>
            </Link>

            <DeleteModal offer={offer}></DeleteModal>
          </div>
        </div>

        {/* Footer Area with Switch and Price */}
        <div className={`mt-auto pt-4 lg:pt-2 flex justify-between items-center gap-4 border-t ${
          isPremium ? 'border-gray-200/50' : 'border-gray-50'
        }`}>
          {/* Status Toggle */}
          <button
            onClick={handleToggleStatus}
            disabled={isChanging}
            className={`relative flex items-center text-center h-8 sm:h-9 lg:h-8 w-24 sm:w-32 md:w-22.5 rounded-full border-2 transition-all duration-500 px-1 ${
              isActive 
                ? "bg-green-50 border-green-100" 
                : "bg-orange-50 border-orange-100"
            }`}
          >
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 rounded-full transition-all duration-500 shadow-md ${
                isActive 
                  ? "bg-green-500 translate-x-16 sm:translate-x-21 md:translate-x-14"
                  : "bg-orange-500 translate-x-0"
              }`}
            />
            <p className={`px-1 absolute w-full text-xs font-bold tracking-wider transition-all duration-500 ${
              isActive 
                ? "text-green-600 -left-3 sm:left-3.75 md:left-[-18px] md:translate-x-1" 
                : "text-orange-600 left-3 sm:left-3.75 md:left-4.5 md:-translate-x-2"
            }`}>
              {isActive ? "Activa" : "Inactiva"}
            </p>
          </button>

          <div className="text-right flex items-center">
            <span className={`font-bold text-base sm:text-lg lg:text-xl tracking-tight text-green-600`}>
              ${Number(offer.salary).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
