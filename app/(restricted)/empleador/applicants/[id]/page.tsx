"use client";

import { use } from "react";
import { useJobOffer } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffer";
import { OfferCard } from "@/features/restricted/empleador/jobOffer/components/OfferCard";
import { ApplicantsList } from "@/features/restricted/empleador/applicantsEmployer/components/ApplicantsList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

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
        <div className="min-h-screen max-w-6xl mx-auto py-8 px-4 md:px-0">
            {/* Botón de volver */}
            <Link 
                href="/empleador/ofertas"
                className="inline-flex items-center gap-2 text-green-600 font-bold text-sm mb-6 hover:bg-green-50 px-4 py-2 rounded-xl transition-all"
            >
                <ArrowLeft size={18} />
                Volver a mis ofertas
            </Link>

            {/* Sección superior: Previsualización de la oferta */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Detalle de la Oferta</h1>
                <div className="pointer-events-none">
                    <OfferCard offer={offer} showActions={false} />
                </div>
            </div>

            {/* Sección inferior: Lista de Postulantes */}
            <div className="border-t border-gray-200 pt-8">
                <ApplicantsList offerId={id} />
            </div>
        </div>
    );
}