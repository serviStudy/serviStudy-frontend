"use client"

import React, { useEffect, useState } from 'react'
import { createApplication } from '../service/postulacionService';
import { getApplications, deleteApplication } from '@/features/restricted/estudiante/misPostulaciones/services/applicationService';
import { toast } from 'sonner';
import { Send, CheckCircle2, Loader2, X } from 'lucide-react';

interface Props {
    offerId: string;
}

export const ApplyButton = ({ offerId }: Props) => {
    const [hasApplied, setHasApplied] = useState(false);
    const [loading, setLoading] = useState(true);   // carga inicial
    const [submitting, setSubmitting] = useState(false); // acción en curso

    // Al montar, revisa si ya hay postulación para esta oferta
    useEffect(() => {
        const checkApplication = async () => {
            try {
                const data = await getApplications();
                const alreadyApplied = data.content.some(
                    (app) => app.jobOffer.jobOfferId === offerId
                );
                setHasApplied(alreadyApplied);
            } catch {
                // Si falla el check, asumimos que no ha postulado (degraded gracefully)
            } finally {
                setLoading(false);
            }
        };
        checkApplication();
    }, [offerId]);

    const handleApply = async () => {
        setSubmitting(true);
        try {
            await createApplication({ jobOfferId: offerId, studentProfileId: '' });
            setHasApplied(true);
            toast.success("¡Postulación enviada con éxito!");
        } catch (error: any) {
            toast.error(error?.message || "Error al postularse. Intenta de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleWithdraw = async () => {
        setSubmitting(true);
        try {
            await deleteApplication(offerId);
            setHasApplied(false);
            toast.success("Postulación retirada correctamente.");
        } catch (error: any) {
            toast.error(error?.message || "Error al retirar la postulación.");
        } finally {
            setSubmitting(false);
        }
    };

    // Estado de carga inicial
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gray-100 text-gray-400">
                <Loader2 size={18} className="animate-spin" />
                <span className="font-semibold text-sm">Verificando postulación...</span>
            </div>
        );
    }

    // Ya postulado
    if (hasApplied) {
        return (
            <div className="flex flex-col gap-2">
                <div className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl text-base cursor-default select-none">
                    <CheckCircle2 size={20} />
                    Ya estás postulado a esta oferta
                </div>
                <button
                    onClick={handleWithdraw}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 font-semibold py-2.5 px-6 rounded-2xl transition-all cursor-pointer disabled:opacity-60"
                >
                    {submitting ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <X size={16} />
                    )}
                    Retirar postulación
                </button>
            </div>
        );
    }

    // Sin postulación — flujo normal
    return (
        <button
            onClick={handleApply}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2.5 bg-[#2552d0] hover:bg-blue-800 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-900/20 text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {submitting ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando postulación...
                </>
            ) : (
                <>
                    <Send size={18} />
                    Postularme a esta oferta
                </>
            )}
        </button>
    );
}

