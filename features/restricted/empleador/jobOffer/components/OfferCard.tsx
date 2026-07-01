"use client";

import { JobOfferDTO } from "../types/jobOffer.types";
import { Pencil, Sparkles, Clock, Calendar, Users, Trash2, CircleDollarSign, CheckCircle2, UsersRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateJobOfferStatus } from "../service/jobOffer.service";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "./DeleteModal";
import { PaginatedApplicants } from "../../applicantsEmployer/types/applicants.types";
import { getApplicantsByOfferId } from "../../applicantsEmployer/services/applicants.service";
import { Tag } from "@/features/restricted/estudiante/perfil/components/ui/Tag";
import { Badge } from "@/components/ui/badge";

interface Props {
  offer: JobOfferDTO;
  imageUrl?: string;
  isPremium?: boolean;
  onRefresh?: () => void;
  showActions?: boolean;
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const OfferCard = ({ offer, imageUrl ,isPremium, onRefresh, showActions = true, subscriptionStatus = "INACTIVE" }: Props) => {
  const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;

  const [data, setData] = useState<PaginatedApplicants | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const isActive = offer.status === "ACTIVE";

  useEffect(() => {
    if (offerId) {
      setLoadingApplicants(true);
      getApplicantsByOfferId(offerId, 0, 1)
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.error("Error fetching applicants count:", err);
        })
        .finally(() => {
          setLoadingApplicants(false);
        });
    }
  }, [offerId]);

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
        className={`lg:hidden group rounded-2xl p-6 relative overflow-hidden mb-4 transition-all duration-200 ${
          subscriptionStatus === "ACTIVE"
            ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "bg-white border border-gray-100 border-l-4 border-l-green-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        }`}
      >
        {subscriptionStatus === "ACTIVE" && (
          <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-blue-500/5 via-emerald-500/5 to-transparent rounded-full blur-2xl"></div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 overflow-hidden transition-all ${
              subscriptionStatus === "ACTIVE"
                ? "bg-linear-to-br from-white to-gray-50/50 border border-white/85 shadow-md shadow-black/5"
                : "bg-gray-50 border border-gray-100 shadow-inner"
            }`}>
              {imageUrl ? (
                <img src={imageUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-white text-sm font-black ${
                  subscriptionStatus === "ACTIVE"
                    ? "bg-linear-to-br from-green-500 to-blue-600 shadow-md shadow-blue-500/10"
                    : "bg-linear-to-br from-green-500 to-green-600"
                }`}>
                  {offer.title?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="min-w-0 flex flex-col gap-2">
              <h3 className="text-sm font-bold text-green-900 truncate capitalize leading-tight mb-0.5">{offer.title}</h3>
              
              <div className={`flex gap-1.5 items-center mb-4 w-fit`}>
                  <CircleDollarSign className={`${subscriptionStatus === "ACTIVE" ? "text-blue-600" : "text-green-600"} h-3.5 w-3.5`} />
                  <p className={`text-xs font-bold tracking-wide`}>
                    ${Number(offer.salary).toLocaleString('es-CO')}
                  </p>
              </div>
            </div>

          </div>
          {showActions && (
            <div className="flex flex-col items-end gap-2 ml-2">
              <Link 
                href={`/empleador/ofertas/${offerId}/editar`} 
                className={`p-2 rounded-lg transition-all ${
                  subscriptionStatus === "ACTIVE"
                    ? "bg-white/80 border border-white/80 text-gray-400 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                    : "bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                  <Pencil size={16} />
              </Link>
              
            </div>
          )}
        </div>


        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 bg-orange-50 text-orange-700 border-none`}>
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
            {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible"}
          </div>
          <div className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 bg-green-50 text-green-700 border-blue-100/60 border-none`}>
            <div className={`h-1.5 w-1.5 rounded-full ${subscriptionStatus === "ACTIVE" ? "bg-green-500" : "bg-green-500"}`}></div>
            {(offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana"}
          </div>
        </div>

        {showActions && (
          <div className="flex justify-between items-center gap-2 pt-2 border-t border-gray-50 mt-2">
            <div className="flex gap-2 flex-1">
              <Link 
                href={rutaSubscription} 
                className={`flex-1 h-10 hidden rounded-xl text-[10px] font-black uppercase tracking-widest md:flex items-center justify-center gap-1 active:scale-95 transition-all border shadow-sm ${
                  subscriptionStatus === "ACTIVE"
                    ? "bg-linear-to-r from-green-50 to-blue-50 text-blue-600 border-blue-200/50 hover:from-green-100 hover:to-blue-100"
                    : "bg-white border border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                Postulantes <Users size={12} />
              </Link>
              <Link 
                href={`/empleador/ofertas/${offerId}`} 
                className={`flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 active:scale-95 transition-all ${
                  subscriptionStatus === "ACTIVE"
                    ? " bg-green-600  text-white shadow-lg shadow-blue-500/10"
                    : "bg-green-600 text-white shadow-lg shadow-green-600/20"
                }`}
              >
                Detalle <Sparkles size={12} />
              </Link>
            </div>
          </div>
        )}

        <div className="pt-4 flex w-full">
          {showActions && (
            <div className="flex items-end gap-2 ml-2">
              <button
                onClick={handleToggleStatus}
                disabled={isChanging}
                className={`relative flex items-center h-9 w-16 rounded-full border-2 transition-all duration-500 px-3 ${
                  isActive ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-500 shadow-sm ${
                    isActive ? "bg-green-500 translate-x-6" : "bg-orange-500 translate-x-0"
                  }`}
                />
              </button>

              <DeleteModal offer={offer}></DeleteModal>
            </div>
          )}
        </div>
      </motion.div>

      {/* DESKTOP VERSION (hidden lg:flex) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4 }}
        className={`hidden lg:flex group rounded-2xl p-6 gap-8 shadow-sm transition-all duration-400 relative overflow-hidden w-full ${
          subscriptionStatus === "ACTIVE"
            ? "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] "
            : "bg-white border border-gray-100 border-l-4 border-l-green-500 hover:shadow-md"
        }`}
      >
        {subscriptionStatus === "ACTIVE" ? (
          <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-linear-to-br from-blue-500/5 via-emerald-500/5 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        ) : (
          <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
        )}

        <div className="relative shrink-0">
          <div className={`w-32 h-32 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700 border ${
            subscriptionStatus === "ACTIVE"
              ? "bg-linear-to-br from-white to-gray-50/50 border-white/80 shadow-lg shadow-black/5"
              : "bg-gray-50 border-gray-100"
          }`}>
            {imageUrl ? (
              <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-1000" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center text-white text-8xl font-black shadow-lg ${
                subscriptionStatus === "ACTIVE"
                  ? "bg-linear-to-br from-green-500 to-blue-600"
                  : "bg-linear-to-br from-green-600 via-green-500 to-green-400"
              }`}>
                {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold capitalize text-gray-700 tracking-tight truncate transition-colors duration-300`}>
                {offer.title}
              </h3>

              {/* <Badge className="flex gap-2 min-w- bg-linear-to-r from-green-50 to-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-xs border border-blue-100/50">
                <UsersRound size={40} className="text-blue-300"/>
                <span >
                  {loadingApplicants ? "..." : (data?.totalElements ?? 0)} postulantes en total
                </span>
              </Badge> */}
            </div>
            
            {showActions && (
              <div className="flex items-end gap-4 shrink-0">
                <button
                  onClick={handleToggleStatus}
                  disabled={isChanging}
                  className={`relative flex items-center py-2 w-30 px-4 rounded-xl border transition-all duration-500 shadow-sm ${
                    isActive 
                      ? subscriptionStatus === "ACTIVE"
                        ? "bg-linear-to-r from-green-50 to-blue-50 border-blue-100"
                        : "bg-green-50 border-green-100"
                      : "bg-orange-50 border-orange-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-500 shadow-md ${
                      isActive ? 
                          "bg-green-500 translate-x-15" :
                          "bg-orange-500 translate-x-0"
                    }`}
                  />
                  <span className={`absolute w-full text-center text-xs font-black tracking-widest transition-all duration-500 ${
                    isActive ? 
                      "text-green-600 -left-3" :
                      "text-orange-600 left-3"
                  }`}>
                    {isActive ? "Activa" : "Inactiva"}
                  </span>
                </button>

                <Link 
                  href={`/empleador/ofertas/${offerId}/editar`} 
                  className={`p-2.5 rounded-xl border transition-all shadow-sm flex items-center justify-center ${
                    subscriptionStatus === "ACTIVE"
                      ? "bg-white/80 border-white/80 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                      : "bg-gray-50 border-transparent text-gray-400 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  <Pencil size={18} />
                </Link>

                <DeleteModal offer={offer}></DeleteModal>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 my-2">
              {[
                { 
                  label: (offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible", 
                  color: subscriptionStatus === "ACTIVE" ? "text-orange-700 bg-orange-50/50 border-orange-100/60" : "", 
                  dot: "bg-orange-500" 
                },
                { 
                  label: (offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana", 
                  color: subscriptionStatus === "ACTIVE" ? "text-green-700 bg-green-50/50 border-green-100/60" : "", 
                  dot: subscriptionStatus === "ACTIVE" ? "bg-green-500" : "" 
                }
              ].map((tag, i) => (
                <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border shadow-sm ${tag.color}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${tag.dot}`}></div>
                    {tag.label}
                </div>
              ))}

              <div className={`flex text-gray-700 gap-1.5 bg-blue-50 rounded-xl items-center p-2 shadow`}>
                  <CircleDollarSign className={`h-4 w-4 text-blue-700`} />
                  <p className={`text-xs text-blue-700 font-semibold uppercase tracking-wider`}>
                    ${Number(offer.salary).toLocaleString('es-CO')}
                  </p>
              </div>
          </div>

          <Badge className="flex gap-1 mb-4 min-w- bg-transparent text-gray-500 px-3 py-1.5 rounded-lg font-bold text-xs">
            <UsersRound size={40} className="text-gray-500 text-bold"/>
            <span >
              {loadingApplicants ? "..." : (data?.totalElements ?? 0)} postulantes en total
            </span>
          </Badge>

          <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-200">

            {showActions && (
              <>
                <div className="flex gap-3">
                  
                  <Link 
                    href={rutaSubscription} 
                  >
                    <Button className="flex-1 cursor-pointer w-full bg-gray-100 hover:shadow-md hover:-translate-y-0.5 text-gray-600 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 active:scale-95 transition-all">
                      Postulantes 
                      <Users size={12} />
                    </Button>
                  </Link>
                  <Link 
                    href={`/empleador/ofertas/${offerId}`} 
                    className={`text-green-600 hover:bg-green-50 px-8 rounded-xl text-xs font-black transition-all hover:-translate-y-0.5 text-center uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 group/btn`}
                  >
                    Ver Detalle Completo 
                    <Sparkles size={16} className="group-hover:rotate-12 text-green-600 transition-transform animate-pulse" />
                  </Link>
                </div>   
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
