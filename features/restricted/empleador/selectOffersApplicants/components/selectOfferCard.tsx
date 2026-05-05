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
                className="lg:hidden group bg-white rounded-[24px] border border-gray-100 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden mb-4"
            >
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-700 ${isActive ? 'bg-green-600' : 'bg-orange-400'}`} />
                
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
                            <h3 className="text-sm font-black text-gray-900 truncate leading-tight mb-0.5">{offer.title}</h3>
                            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
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

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-50">
                    <div className="flex flex-wrap gap-1">
                        {offer.requirements?.slice(0, 3).map((req: any, index: number) => (
                            <span key={index} className="text-[8px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100/50">
                                #{typeof req === 'string' ? req : (req.requirementName || req.name)}
                            </span>
                        ))}
                    </div>
                    <Link href={`/empleador/applicants/${offerId}`} className="w-full bg-[#1a4b9e] text-white h-10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95">
                        Ver Postulantes <Sparkles size={12} />
                    </Link>
                </div>
            </motion.div>

            {/* DESKTOP VERSION (hidden lg:flex) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:flex group bg-white rounded-[2.5rem] border border-gray-100 p-6 gap-8 shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden w-full"
            >
                <div className={`absolute left-0 top-0 bottom-0 w-3 transition-all duration-700 ${isActive ? 'bg-[#28a745] shadow-[4px_0_20px_rgba(40,167,69,0.3)]' : 'bg-orange-400 shadow-[4px_0_20px_rgba(251,146,60,0.3)]'}`} />
                <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-[0.03]" />

                <div className="relative shrink-0">
                    <div className="w-44 h-44 bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-1 transition-transform duration-700">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#28a745] to-[#1e7e34] flex items-center justify-center text-white text-7xl font-black shadow-lg">
                                {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-6">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-2xl font-black text-gray-900 leading-tight mb-3 truncate group-hover:text-green-800 transition-colors">{offer.title}</h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 font-bold shadow-sm">
                                    <MapPin size={16} className="shrink-0 text-[#28a745]" />
                                    <span className="truncate max-w-[200px] text-xs">{offer.establishment_address || offer.establishmentAddress}</span>
                                </div>
                                <div className="text-[#28a745] flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-xl border border-green-100 shadow-sm font-black">
                                    <span className="text-[10px] uppercase opacity-60">Sueldo</span>
                                    <span className="text-lg">${Number(offer.salary).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="flex items-center gap-2">
                                <Link href={`/empleador/ofertas/${offerId}/editar`} className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-[#28a745] transition-all border border-transparent hover:border-green-100 shadow-sm active:scale-90">
                                    <Pencil size={20} />
                                </Link>
                                <button onClick={() => setShowDeleteModal(true)} className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm active:scale-90">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <button onClick={handleToggleStatus} disabled={isChanging} className={`flex relative items-center h-12 w-32 rounded-full border-2 transition-all duration-500 shadow-sm active:scale-95 px-1.5 ${isActive ? "border-green-100 bg-green-50/50" : "border-orange-100 bg-orange-50/50"}`}>
                                <div className={`w-8 h-8 rounded-full transition-all duration-500 shadow-md transform flex items-center justify-center ${isActive ? "bg-[#28a745] translate-x-[76px]" : "bg-orange-500 translate-x-0"}`}>
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                </div>
                                <span className={`absolute w-full text-center text-[10px] font-black uppercase tracking-wider z-10 ${isActive ? "text-[#1e7e34] left-[-15px]" : "text-orange-900 left-[15px]"}`}>
                                    {isActive ? "Activa" : "Pausa"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <p className="text-[15px] text-gray-600 font-medium my-5 line-clamp-2 leading-relaxed">
                        {offer.description || (offer as any).dutiesDescription || "Sin descripción disponible."}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                            {offer.requirements?.slice(0, 3).map((req: any, index: number) => (
                                <span key={index} className="bg-gray-50 border border-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                                    {typeof req === 'string' ? req : (req.requirementName || req.name)}
                                </span>
                            ))}
                        </div>
                        <Link
                            href={`/empleador/applicants/${offerId}`}
                            className="flex items-center gap-2 bg-[#1a4b9e] hover:bg-[#0d3275] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-95 group/btn"
                        >
                            Ver postulantes
                            <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                        </Link>
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