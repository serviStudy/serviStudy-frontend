"use client";

import { use } from "react";
import { useJobOffer } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffer";
import { OfferCard } from "@/features/restricted/empleador/jobOffer/components/OfferCard";
import { ApplicantsList } from "@/features/restricted/empleador/applicantsEmployer/components/ApplicantsList";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { Button } from "@/components/ui/button";
import { ModalRecomendation } from "@/features/restricted/empleador/applicantsEmployer/components/ModalRecomendation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
    const { id } = use(params);
    const { offer, loading, error } = useJobOffer(id);

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
        <div className="min-h-screen max-w-6xl mx-auto py-4 px-4 md:px-0 relative z-10">
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
                </div>
            </div>

            {/* Sección superior: Previsualización de la oferta */}
            <div className="my-8 pt-20">
                <div className="pointer-events-none">
                    <OfferCard offer={offer} showActions={false} />
                </div>
            </div>

            <hr className="border-gray-200 h-1"/>
            
            <ModalRecomendation></ModalRecomendation>

            {/* Sección inferior: Lista de Postulantes */}
            <div className="mt-8">
                <ApplicantsList offerId={id} />
            </div>
        </div>
    );
}