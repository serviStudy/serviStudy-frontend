"use client";

import { use, useState } from "react";
import { useJobOffer } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffer";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { ListApplicant } from "@/features/restricted/empleador/compatibility/components/ListApplicant";
import { Offer } from "@/features/restricted/empleador/compatibility/components/Offer";
import { ApplyCompatibility } from "@/features/restricted/empleador/compatibility/components/ApplyCompatibility";
import { toast } from "sonner";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
    const { id } = use(params);
    const { offer, loading, error } = useJobOffer(id);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    const handleToggleSelection = (applicantId: string) => {
        setSelectedIds(prev => {
            if (prev.includes(applicantId)) {
                return prev.filter(id => id !== applicantId);
            }
            if (prev.length >= 5) {
                toast.error("Solo puedes seleccionar hasta 5 postulantes.");
                return prev;
            }
            return [...prev, applicantId];
        });
    };

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-gray-500 font-medium">ID de oferta no válido.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen items-center justify-center">
                <LoadingScreen></LoadingScreen>
                <p className="text-sm text-gray-500 font-medium text-center mt-4">Cargando oferta...</p>
            </div>
        );
    }

    if (error || !offer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">Oferta no encontrada</h2>
                <Link href="/empleador/ofertas" className="text-sm font-medium text-green-600 hover:underline">
                    Volver a ofertas
                </Link>
            </div>
        );
    }


    return (
        <div className="min-h-screen max-w-6xl mx-auto py-4 px-4 md:px-0">
            <div className="w-full py-4 mb-6 top-0 fixed z-20 bg-white/10 backdrop-blur-md">
                <div className="max-w-6xl flex justify-between items-center">
                    <Link 
                        href="/empleador/ofertas"
                        className="inline-flex items-center gap-2 text-green-600 font-bold text-sm hover:bg-green-50 px-4 py-2 rounded-xl transition-all"
                    >
                        <ArrowLeft size={18} />
                        <span className="hidden sm:inline">Volver a mis ofertas</span>
                        <span className="sm:hidden">Volver</span>
                    </Link>

                    <ApplyCompatibility offerId={id} selectedIds={selectedIds} />
                </div>
            </div>

            {/* Sección superior: Previsualización de la oferta */}
            <div className="my-8 pt-6">
                <div className="pointer-events-none">
                    <Offer offer={offer} showActions={false} />
                </div>
            </div>

            <hr className="h-px bg-linear-to-r from-green-300 to-blue-300"/>

            {/* Sección inferior: Lista de Postulantes */}
            <div className="mt-10">
                <ListApplicant 
                    offerId={id} 
                    selectedIds={selectedIds}
                    onToggleSelection={handleToggleSelection}
                />
            </div>
        </div>
    );
}

