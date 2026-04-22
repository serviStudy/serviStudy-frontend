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

  const getDaysLabel = (days?: string[]) => {
    if (!days || days.length === 0) return "Días no definidos";
    if (days.length >= 5 && !days.includes("SATURDAY") && !days.includes("SUNDAY")) return "Entre semana";
    if (days.length === 2 && days.includes("SATURDAY") && days.includes("SUNDAY")) return "Fines de semana";
    if (days.length === 7) return "Toda la semana";
    return "Personalizado";
  };

  const getScheduleLabel = (schedule?: string) => {
    switch(schedule) {
      case "FULL_TIME": return "Jornada completa";
      case "PART_TIME": return "Media jornada";
      case "FLEXIBLE": return "Flexible";
      default: return schedule || "Horario flexible";
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 flex gap-4 sm:gap-6 w-full shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      
      {/* 1. Placeholder / Imagen (Left Side) - Large Square */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-[28px] shrink-0 border border-gray-50 overflow-hidden flex items-center justify-center shadow-inner group-hover:shadow-md transition-shadow">
        {imageUrl ? (
          <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 text-3xl font-black">
            {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>

      {/* 2. Content (Right Side) */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Row 1: Status Badge & Action Icons */}
        <div className="flex justify-between items-center mb-1.5">
          <button
            onClick={handleToggleStatus}
            disabled={isChanging}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all active:scale-95 ${
              isActive 
                ? "bg-green-50 border-green-100 text-green-600" 
                : "bg-orange-50 border-orange-100 text-orange-600"
            }`}
          >
            <div className={`w-3 h-3 rounded-full animate-pulse ${isActive ? "bg-green-500" : "bg-orange-500"}`}></div>
            <span className="text-[12px] font-black uppercase tracking-tight">
              {isActive ? "Activa" : "Inactiva"}
            </span>
          </button>

          <div className="flex gap-1">
            <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-1.5 text-gray-400 hover:text-[#1a3683] transition-colors rounded-lg hover:bg-gray-50">
              <Edit size={18} />
            </Link>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Row 2: Title */}
        <h3 className="font-black text-[#1a3683] text-xl sm:text-2xl leading-none mb-0.5 truncate">
          {offer.title}
        </h3>

        {/* Row 3: Company / Context */}
        <p className="text-[#3a56a5] font-bold text-sm sm:text-base mb-3 opacity-90 truncate">
          {businessName || "Empresa Verificada"}
        </p>

        {/* Row 4: Info Icons (Location & Salary) */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
          <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm">
            <MapPin size={16} />
            <span className="truncate max-w-[120px] font-bold">{offer.establishment_address || offer.establishmentAddress}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#1a3683] font-black text-sm">
            <div className="w-5 h-5 rounded-full border-2 border-[#1a3683] flex items-center justify-center font-bold text-[10px]">$</div>
            <span>{Number(offer.salary).toLocaleString()}</span>
          </div>
        </div>

        {/* Row 5: Tags (Work Days & Schedule) */}
        <div className="flex flex-wrap gap-2">
          <div className="px-5 py-1.5 rounded-xl bg-blue-50 text-[#1a3683] text-[13px] font-black border border-blue-100/50">
            {getDaysLabel(offer.work_days || offer.workDays)}
          </div>
          <div className="px-5 py-1.5 rounded-xl bg-blue-100/40 text-[#1a3683] text-[13px] font-black border border-blue-100/30">
            {getScheduleLabel(offer.work_schedule || offer.workSchedule)}
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
