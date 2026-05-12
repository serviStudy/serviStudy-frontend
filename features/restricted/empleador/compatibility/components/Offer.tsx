"use client";

import { Pencil, Trash2, MapPin, Sparkles, Clock, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
    import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
import { JobOfferDTO } from "../../jobOffer/types/jobOffer.types";
import { updateJobOfferStatus } from "../../jobOffer/service/jobOffer.service";

    interface Props {
    offer: JobOfferDTO;
    imageUrl?: string;
    onRefresh?: () => void;
    showActions?: boolean;
    }

    export const Offer = ({ offer, imageUrl, onRefresh, showActions = true }: Props) => {
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
        <div className="w-full">
        {/* MOBILE VERSION (lg:hidden) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden group bg-white rounded-[24px] border border-gray-100 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden mb-4"
        >
            <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-700 ${isActive ? 'bg-green-600' : 'bg-orange-600'}`} />
            
            <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl font-black">
                    {offer.title?.charAt(0).toUpperCase()}
                    </div>
                )}
                </div>
                <div className="min-w-0">
                <h3 className="text-sm font-black text-gray-900 truncate leading-tight mb-0.5">{offer.title}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <MapPin size={10} className="text-green-500" />
                    <span className="truncate">{offer.establishment_address || offer.establishmentAddress}</span>
                </div>
                </div>
            </div>
            {showActions && (
                <div className="flex items-center gap-1 ml-2">
                <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-lg bg-gray-50 text-gray-400">
                    <Pencil size={16} />
                </Link>
                <button onClick={() => setShowDeleteModal(true)} className="p-2 rounded-lg bg-gray-50 text-gray-400">
                    <Trash2 size={16} />
                </button>
                </div>
            )}
            </div>

            <div className="flex items-center justify-between bg-gray-50/50 rounded-xl p-2.5 mb-4 border border-gray-100/50">
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Sueldo</span>
                <span className="text-green-600 text-sm font-black">${Number(offer.salary).toLocaleString()}</span>
            </div>
            <button onClick={handleToggleStatus} disabled={isChanging} className={`flex relative items-center h-8 w-24 rounded-full border transition-all px-1 ${isActive ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
                <div className={`w-6 h-6 rounded-full shadow-md transition-all transform flex items-center justify-center ${isActive ? "bg-green-600 translate-x-[64px]" : "bg-orange-500 translate-x-0"}`}>
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                </div>
                <span className={`absolute w-full text-center text-[8px] font-black uppercase tracking-wider z-10 ${isActive ? "text-green-700 left-[-8px]" : "text-orange-900 left-[8px]"}`}>
                {isActive ? "Activa" : "Pausa"}
                </span>
            </button>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-100 text-gray-500 font-bold text-[9px] uppercase shadow-sm">
                <Clock size={10} className="text-green-500" /> {(offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Completa" : "Media"}
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-gray-100 text-gray-500 font-bold text-[9px] uppercase shadow-sm">
                <Calendar size={10} className="text-green-500" /> {(offer.work_days || offer.workDays)?.length > 2 ? "Semana" : "Fines"}
            </div>
            </div>

            {showActions && (
            <div className="flex gap-2">
                <Link 
                href={`/empleador/applicants/${offerId}`} 
                className="flex-1 bg-white border-2 border-green-600 text-green-600 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                Postulantes <Users size={12} />
                </Link>
                <Link 
                href={`/empleador/ofertas/${offerId}`} 
                className="flex-1 bg-green-600 text-white h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95"
                >
                Ver Detalle <Sparkles size={12} />
                </Link>
            </div>
            )}
        </motion.div>

        {/* DESKTOP VERSION (hidden lg:flex) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex group bg-white rounded-xl border border-gray-100 p-6 gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden w-full"
        >
            <div className={`absolute left-0 top-0 bottom-0 w-3 transition-all duration-700 ${isActive ? 'bg-linear-to-r from-green-500 to-emerald-300' : 'bg-linear-to-b from-orange-500 to-amber-300'}`} />
            <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

            <div className="relative shrink-0">
            <div className="w-36  h-36 bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-2 transition-all duration-700">
                {imageUrl ? (
                <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 flex items-center justify-center text-white text-8xl font-black shadow-lg">
                    {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
                </div>
                )}
            </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
            <div className="flex justify-between items-start gap-6">
                <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight mb-3 truncate group-hover:text-green-600 transition-colors duration-300">
                    {offer.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-500 font-medium shadow-sm group-hover:bg-white transition-colors">
                    <MapPin size={16} className="shrink-0 text-green-500" />
                    <span className="truncate max-w-[150px] tracking-tight text-xs">{offer.establishment_address || offer.establishmentAddress}</span>
                    </div>
                    <div className="text-green-600 flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-lg border border-green-100 shadow-sm">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">Sueldo</span>
                    <span className="text-lg font-bold tracking-tight">${Number(offer.salary).toLocaleString()}</span>
                    </div>
                </div>
                </div>
                
                <div className="flex items-center gap-4 shrink-0">
                <button onClick={handleToggleStatus} disabled={isChanging} className={`flex relative items-center h-12 w-36 rounded-full border-2 transition-all duration-700 shadow-sm active:scale-95 px-2 ${isActive ? "border-green-100 bg-green-50/50" : "border-orange-100 bg-orange-50/50"}`}>
                    <div className={`w-8 h-8 rounded-full transition-all duration-700 shadow-lg transform flex items-center justify-center ${isActive ? "bg-green-600 translate-x-[92px]" : "bg-orange-500 translate-x-0"}`}>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>
                    <span className={`absolute w-full text-center text-[11px] font-black uppercase tracking-[0.15em] z-10 transition-all duration-700 ${isActive ? "text-green-700 left-[-15px]" : "text-orange-900 left-[15px]"}`}>
                    {isActive ? "Activa" : "Pausada"}
                    </span>
                </button>
                {showActions && (
                <div className="flex items-center gap-2 relative z-10">
                    <Link href={`/empleador/ofertas/${offerId}/editar`} className="relative z-10 p-4 rounded-2xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all border border-transparent hover:border-green-100 shadow-sm active:scale-90 cursor-pointer">
                    <Pencil size={22} />
                    </Link>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteModal(true); }} className="relative z-10 p-4 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm active:scale-90 cursor-pointer">
                    <Trash2 size={22} />
                    </button>
                </div>
                )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 my-6">
                {[
                { icon: Clock, label: (offer.work_schedule || offer.workSchedule) === "FULL_TIME" ? "Jornada Completa" : (offer.work_schedule || offer.workSchedule) === "PART_TIME" ? "Media Jornada" : "Flexible", color: "text-orange-600 bg-orange-50 border-orange-100" },
                { icon: Calendar, label: (offer.work_days || offer.workDays)?.length > 2 ? "Entre semana" : "Fines de semana", color: "text-green-600 bg-green-50 border-green-100" }
                ].map((tag, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[11px] uppercase tracking-wider border shadow-sm ${tag.color}`}>
                    <tag.icon size={14} /> {tag.label}
                </div>
                ))}
            </div>

            <div className="mt-auto pt-8 flex justify-between items-center border-t border-gray-50">
                <div className="flex gap-2 flex-wrap justify-start">
                {offer.requirements?.slice(0, 4).map((req: any, index: number) => (
                    <span key={index} className="bg-white border border-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider shadow-sm group-hover:border-green-100 transition-colors">
                    {typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito")}
                    </span>
                ))}
                </div>
                {showActions && (
                <div className="flex gap-3">
                    <Link 
                    href={`/empleador/applicants/${offerId}`} 
                    className="group/applicants flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold transition-all border-2 border-green-600 text-green-600 hover:bg-green-50 active:scale-95 uppercase tracking-wider"
                    >
                    Ver Postulantes
                    <Users size={16} className="group-hover/applicants:scale-110 transition-transform" />
                    </Link>
                    <Link 
                    href={`/empleador/ofertas/${offerId}`} 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 group/btn"
                    >
                    Ver Detalle Completo 
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>
                )}
            </div>
            </div>
        </motion.div>

        {/* Delete Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogContent className="sm:max-w-md rounded-[32px] border border-gray-50 shadow-2xl p-0 overflow-hidden bg-white outline-none">
            <div className="relative p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <Trash2 className="text-red-500 w-8 h-8" />
                </div>
                <DialogHeader>
                <DialogTitle className="text-xl font-black text-gray-900 mb-2">¿Eliminar oferta?</DialogTitle>
                <DialogDescription className="text-gray-400 font-medium text-sm">
                    Esta acción borrará permanentemente la vacante <span className="text-red-600 font-bold">&quot;{offer.title}&quot;</span>.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-8 flex w-full gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting} className="rounded-xl flex-1 h-12 font-bold text-gray-400 border-gray-100">
                    Cerrar
                </Button>
                <Button onClick={confirmDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex-1 h-12 font-bold border-none">
                    Eliminar
                </Button>
                </DialogFooter>
            </div>
            </DialogContent>
        </Dialog>
        </div>
    );
};