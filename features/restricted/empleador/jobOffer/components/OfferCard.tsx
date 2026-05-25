"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
import { Pencil, Sparkles, Clock, Calendar, Users, Trash2, CircleDollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { updateJobOfferStatus } from "../service/jobOffer.service";
import { Button } from "@/components/ui/button";

interface Props {
  offer: JobOfferDTO;
  imageUrl?: string;
  onRefresh?: () => void;
  showActions?: boolean;
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const OfferCard = ({ offer, imageUrl, onRefresh, showActions = true, subscriptionStatus = "INACTIVE" }: Props) => {
  const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;

  const [isChanging, setIsChanging] = useState(false);
  const isActive = offer.status === "ACTIVE";

  const handleToggleStatus = async () => {
    if (!offerId || isChanging) return;
    setIsChanging(true);
    const newStatus = isActive ? "DISABLED" : "ACTIVE";
    try {
      await updateJobOfferStatus(offerId, newStatus);
      toast.success(`Oferta ${isActive ? "desactivada" : "activada"} correctamente`);
      if (onRefresh) onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Error al cambiar estado");
    } finally {
      setIsChanging(false);
    }
  };

  // página dependeiendo del estado de ls subscripcion
  const rutaSubscription = subscriptionStatus === "ACTIVE"
  ? `/empleador/compatibility/${offerId}`
  : `/empleador/applicants/${offerId}`;



  return (
    <div className="w-full">
      {/* MOBILE VERSION (lg:hidden) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden group bg-white rounded-2xl border border-gray-100 border-l-[4px] border-l-green-500 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden mb-4"
      >
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl font-black">
                  {offer.title?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-gray-900  truncate capitalize leading-tight mb-0.5">{offer.title}</h3>
            </div>
          </div>
          {showActions && (
            <div className="flex flex-col items-end gap-2 ml-2">
              <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                  <Pencil size={16} />
              </Link>
              <button
                onClick={handleToggleStatus}
                disabled={isChanging}
                className={`relative flex items-center h-6 w-14 rounded-full border-2 transition-all duration-500 px-1 ${
                  isActive ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-500 shadow-sm ${
                    isActive ? "bg-green-500 translate-x-6" : "bg-orange-500 translate-x-0"
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        <div className='flex gap-1.5 items-center bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 shadow-sm mb-4 w-fit'>
            <CircleDollarSign className='text-green-600 h-3.5 w-3.5' />
            <p className='text-green-700 text-xs font-medium uppercase tracking-wide'>${Number(offer.salary).toLocaleString('es-CO')}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-2.5  bg-orange-50 text-orange-700 rounded-lg text-xs font-medium border border-orange-100 flex items-center gap-1.5 shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
            {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible"}
          </div>
          <div className="px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-100 flex items-center gap-1.5 shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            {(offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana"}
          </div>
        </div>

        {showActions && (
          <div className="flex justify-between items-center gap-2 pt-2 border-t border-gray-50 mt-2">
            <div className="flex gap-2 flex-1">
              <Link 
                href={rutaSubscription} 
                className="flex-1 bg-white border-2 border-green-600 text-green-600 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                Postulantes <Users size={12} />
              </Link>
              <Link 
                href={`/empleador/ofertas/${offerId}`} 
                className="flex-1 bg-green-600 text-white h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 shadow-lg shadow-green-600/20 active:scale-95"
              >
                Detalle <Sparkles size={12} />
              </Link>
            </div>
            <button className="p-2.5 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all shrink-0">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </motion.div>

      {/* DESKTOP VERSION (hidden lg:flex) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:flex group bg-white rounded-2xl border border-gray-100 border-l-4 border-l-green-500 p-6 gap-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden w-full"
      >
        <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

        <div className="relative shrink-0">
          <div className="w-36 h-36 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700">
            {imageUrl ? (
              <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-green-600 via-green-500 to-green-400 flex items-center justify-center text-white text-8xl font-black shadow-lg">
                {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold capitalize text-gray-900 tracking-tight mb-3 truncate group-hover:text-green-600 transition-colors duration-300">
                {offer.title}
              </h3>
              <div className='flex gap-1.5 items-center bg-green-50 px-2.5 py-1 rounded-lg border border-green-100 shadow-sm w-fit mt-1'>
                  <CircleDollarSign className='text-green-600 h-3.5 w-3.5' />
                  <p className='text-green-700 text-xs font-medium uppercase tracking-wide'>${Number(offer.salary).toLocaleString('es-CO')}</p>
              </div>
            </div>
            
            {showActions && (
              <div className="flex items-end gap-4 shrink-0">
                <button
                  onClick={handleToggleStatus}
                  disabled={isChanging}
                  className={`relative flex items-center py-2 w-30 px-4 rounded-xl border-2 transition-all duration-500 ${
                    isActive ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-500 shadow-md ${
                      isActive ? "bg-green-500 translate-x-15" : "bg-orange-500 translate-x-0"
                    }`}
                  />
                  <span className={`absolute w-full text-center text-sm font-semibold tracking-widest transition-all duration-500 ${isActive ? "text-green-600 left-[-12px]" : "text-orange-600 left-[12px]"}`}>
                    {isActive ? "Activa" : "Inactiva"}
                  </span>
                </button>

                <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all shadow-sm flex items-center justify-center">
                  <Pencil size={18} />
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 my-6">
             {[
               { label: (offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible", color: "text-orange-700 bg-orange-50 border-orange-100", dot: "bg-orange-500" },
               { label: (offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana", color: "text-green-700 bg-green-50 border-green-100", dot: "bg-green-500" }
             ].map((tag, i) => (
               <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border shadow-sm ${tag.color}`}>
                  <div className={`h-1.5 w-1.5 rounded-full ${tag.dot}`}></div>
                  {tag.label}
               </div>
             ))}
          </div>

          <div className="mt-auto pt-8 flex justify-between items-center border-t border-gray-50">

            {showActions && (
              <>
                <div className="flex gap-3">
                  
                  <Button className="group/applicants flex bg-white items-center gap-3 px-8 py-1 rounded-xl text-xs font-bold transition-all border-2 border-green-600 text-green-600 hover:bg-green-50 active:scale-95 uppercase tracking-wider">
                    <Link 
                    href={rutaSubscription} 
                  >
                    Ver Postulantes
                    <Users size={16} className="group-hover/applicants:scale-110 transition-transform" />
                  </Link>
                  </Button>
                  <Link 
                    href={`/empleador/ofertas/${offerId}`} 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 group/btn"
                  >
                    Ver Detalle Completo 
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                  </Link>
                </div>
                <button className="text-red-500 hover:bg-red-600 hover:text-white p-3 rounded-xl transition-all border border-red-100 hover:border-red-600 bg-red-50 flex items-center justify-center">
                  <Trash2 size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
