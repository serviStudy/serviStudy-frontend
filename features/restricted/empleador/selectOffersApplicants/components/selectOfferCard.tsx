"use client";

import { Pencil, Trash2, MapPin, Sparkles, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
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
import { JobOfferDTO } from "@/features/restricted/empleador/jobOffer/types/jobOffer.types";
import { updateJobOfferStatus } from "@/features/restricted/empleador/jobOffer/service/jobOffer.service";

interface Props {
    offer: JobOfferDTO;
    imageUrl?: string;
    onRefresh?: () => void;
}

export const SelectOfferCard = ({ offer, imageUrl, onRefresh }: Props) => {
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
                className="lg:hidden group bg-white rounded-xl border border-gray-200 p-4 shadow-sm relative overflow-hidden mb-4"
            >
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-700 ${isActive ? 'bg-green-600' : 'bg-orange-400'}`} />
                
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-lg font-bold">
                                    {offer.title?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight mb-0.5">{offer.title}</h3>
                            <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                                <MapPin size={10} className="text-green-500" />
                                <span className="truncate">{offer.establishment_address || offer.establishmentAddress}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                        <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-2 rounded-lg bg-gray-50 text-gray-400">
                            <Pencil size={16} />
                        </Link>
                        <button onClick={() => setShowDeleteModal(true)} className="p-2 rounded-lg bg-gray-50 text-gray-400">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2.5 mb-4 border border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Sueldo</span>
                        <span className="text-green-600 text-sm font-bold">${Number(offer.salary).toLocaleString()}</span>
                    </div>
                    <button onClick={handleToggleStatus} disabled={isChanging} className={`flex relative items-center h-8 w-24 rounded-full border transition-all px-1 ${isActive ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
                        <div className={`w-6 h-6 rounded-full shadow-md transition-all transform flex items-center justify-center ${isActive ? "bg-green-600 translate-x-[64px]" : "bg-orange-500 translate-x-0"}`}>
                            <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                        </div>
                        <span className={`absolute w-full text-center text-xs font-medium uppercase tracking-wider z-10 ${isActive ? "text-green-700 left-[-8px]" : "text-orange-900 left-[8px]"}`}>
                            {isActive ? "Activa" : "Pausa"}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                        {offer.requirements?.slice(0, 3).map((req: any, index: number) => (
                            <span key={index} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">
                                #{typeof req === 'string' ? req : (req.requirementName || req.name)}
                            </span>
                        ))}
                    </div>
                    <Link href={`/empleador/applicants/${offerId}`} className="w-full bg-green-600 hover:bg-green-700 text-white h-10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all">
                        Ver Postulantes <Sparkles size={12} />
                    </Link>
                </div>
            </motion.div>

            {/* DESKTOP VERSION (hidden lg:flex) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:flex group bg-white rounded-xl border border-gray-200 p-6 gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden w-full"
            >
                <div className={`absolute left-0 top-0 bottom-0 w-3 transition-all duration-700 ${isActive ? 'bg-green-600 shadow-[4px_0_20px_rgba(22,163,74,0.3)]' : 'bg-orange-400 shadow-[4px_0_20px_rgba(251,146,60,0.3)]'}`} />
                <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />

                <div className="relative shrink-0">
                    <div className="w-44 h-44 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center group-hover:rotate-1 transition-transform duration-700">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center text-white text-6xl font-bold">
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
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 font-medium shadow-sm">
                                    <MapPin size={16} className="shrink-0 text-green-500" />
                                    <span className="truncate max-w-[200px] text-xs">{offer.establishment_address || offer.establishmentAddress}</span>
                                </div>
                                <div className="text-green-600 flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-lg border border-green-100 shadow-sm">
                                    <span className="text-xs font-medium uppercase opacity-60">Sueldo</span>
                                    <span className="text-lg font-bold">${Number(offer.salary).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="flex items-center gap-2">
                                <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all border border-transparent hover:border-green-100 shadow-sm active:scale-90">
                                    <Pencil size={20} />
                                </Link>
                                <button onClick={() => setShowDeleteModal(true)} className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm active:scale-90">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <button onClick={handleToggleStatus} disabled={isChanging} className={`flex relative items-center h-12 w-36 rounded-full border-2 transition-all duration-700 shadow-sm active:scale-95 px-2 ${isActive ? "border-green-100 bg-green-50/50" : "border-orange-100 bg-orange-50/50"}`}>
                                <div className={`w-8 h-8 rounded-full transition-all duration-700 shadow-lg transform flex items-center justify-center ${isActive ? "bg-green-600 translate-x-[92px]" : "bg-orange-500 translate-x-0"}`}>
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                </div>
                                <span className={`absolute w-full text-center text-xs font-bold uppercase tracking-wider z-10 transition-all duration-700 ${isActive ? "text-green-700 left-[-15px]" : "text-orange-900 left-[15px]"}`}>
                                    {isActive ? "Activa" : "Pausada"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 font-medium my-4 line-clamp-2 leading-relaxed">
                        {offer.description || (offer as any)?.dutiesDescription || "Sin descripción disponible."}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                            {offer.requirements?.slice(0, 3).map((req: any, index: number) => (
                                <span key={index} className="bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-lg text-xs font-medium">
                                    {typeof req === 'string' ? req : (req.requirementName || req.name)}
                                </span>
                            ))}
                        </div>
                        <Link
                            href={`/empleador/applicants/${offerId}`}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 group/btn"
                        >
                            Ver postulantes
                            <Sparkles size={14} className="group-hover/btn:rotate-12 transition-transform" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Delete Modal */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent className="sm:max-w-md rounded-xl border border-gray-200 shadow-lg p-0 overflow-hidden bg-white outline-none">
                    <div className="relative p-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                            <Trash2 className="text-red-500 w-8 h-8" />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">¿Eliminar oferta?</DialogTitle>
                            <DialogDescription className="text-gray-500 font-medium text-sm">
                                Esta acción borrará permanentemente la vacante <span className="text-red-600 font-bold">&quot;{offer.title}&quot;</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-8 flex w-full gap-3">
                            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting} className="rounded-xl flex-1 h-12 font-semibold text-gray-400 border-gray-200">
                                Cerrar
                            </Button>
                            <Button onClick={confirmDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex-1 h-12 font-semibold border-none">
                                Eliminar
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};