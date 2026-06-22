import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { getApplications ,deleteApplication } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService';

import { Loader2, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface Props {
    offerId: string;
    onWithDrawSuccess?: () => void;
}


export const DeleteConfirmModal = ({offerId, onWithDrawSuccess}: Props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [submitting, setSubmitting] = useState(false); // acción en curso
    

    const handleWithdraw = async () => {
        setSubmitting(true);
        try {
            await deleteApplication(offerId);
            toast.success("Postulación retirada correctamente.");
            setShowDeleteModal(false)

            if (onWithDrawSuccess){
                onWithDrawSuccess()
            }
        } catch (error: any) {
            toast.error(error?.message || "Error al retirar la postulación.");
        } finally {
            setSubmitting(false);
        }
    };


        return (
            <Dialog  open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogTrigger asChild>
                    <button
                        className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 font-semibold py-2.5 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-60"
                    >
                        Retirar postulación
                    </button>
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
                        ¿Estás seguro de que deseas eliminar la postulacion?
                        </p>
                    </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        <button
                        onClick={handleWithdraw}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 font-semibold py-2.5 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-60"
                    >
                        {submitting ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <X size={16} />
                        )}
                        Retirar postulación
                    </button>
                    <Button 
                        variant="outline" 
                        onClick={() => setShowDeleteModal(false)} 
                        className="rounded-xl font-bold text-gray-700 hover:bg-gray-50 border-gray-200 h-12 transition-all active:scale-95 text-sm order-2 sm:order-1"
                    >
                        Cancelar
                    </Button>
                    </div>
                </motion.div>
                </DialogContent>
            )}
            </AnimatePresence>
        </Dialog>
    )
}
