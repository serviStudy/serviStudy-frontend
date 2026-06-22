import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { updateJobOfferStatus } from '../service/jobOffer.service';
import { JobOfferDTO } from '../types/jobOffer.types';

interface Props {
    offer: JobOfferDTO;
    onStatusChange?: () => void;
}

export const DeleteModal = ({offer, onStatusChange}: Props) => {
    const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    
    const confirmDelete = async () => {
        if (!offerId) return;
        setIsDeleting(true);
        try {
            await updateJobOfferStatus(offerId, "DELETED");
            toast.success("Oferta eliminada correctamente");
            onStatusChange?.(); 
        } catch (error: any) {
            toast.error(error.message || "No se pudo eliminar la oferta");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

        return (
            <Dialog  open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogTrigger asChild>
                    <Button variant="outline"
                    className='bg-white/80 border border-gray-100 cursor-pointer text-gray-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 hover:shadow-md'
                    >              
                        <Trash2 size={16} className="sm:w-4.5 sm:h-4.5" />
                    </Button>
                </DialogTrigger>
            <DialogTitle></DialogTitle>

            <AnimatePresence>
            {showDeleteModal && (
                <DialogContent className=" rounded-xl border border-gray-200 shadow-xl p-0 overflow-hidden bg-white outline-none">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative p-8 flex flex-col items-center justify-center text-center"
                >

                    <div className="pt-2 mb-6">
                        <span className="px-4  py-1.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-red-100">
                        Operación permanente
                        </span>
                    </div>

                    {/* Icon Section */}
                    <div className="relative mb-6">
                    <div className="w-20 h-20 bg-red-50 rounded-xl flex items-center justify-center relative group/icon">
                        <Trash2 className="text-red-500 w-8 h-8 relative z-10 transition-transform duration-500" />
                    </div>
                    </div>

                    <div className="space-y-3 w-full">
                    <h3 className="text-2xl font-bold text-blue-900 tracking-tight">
                        Confirmar baja
                    </h3>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600 font-medium text-sm">
                        ¿Estás seguro de que deseas eliminar la oferta?
                        </p>
                        <div className="py-2.5 px-4 bg-gray-50 rounded-xl border border-gray-200 inline-block max-w-full">
                        <span className="text-blue-900 font-bold text-base block truncate">"{offer.title}"</span>
                        </div>
                    </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    <Button 
                        variant="outline" 
                        onClick={() => setShowDeleteModal(false)} 
                        disabled={isDeleting} 
                        className="rounded-xl font-bold text-gray-700 hover:bg-gray-50 border-gray-200 h-12 transition-all active:scale-95 text-sm order-2 sm:order-1"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={confirmDelete} 
                        disabled={isDeleting} 
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-sm h-12 transition-all active:scale-95 text-sm order-1 sm:order-2"
                    >
                        {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                    </Button>
                    </div>
                </motion.div>
                </DialogContent>
            )}
            </AnimatePresence>
        </Dialog>
    )
}
