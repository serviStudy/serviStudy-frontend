"use client";

import { use } from "react";
import { useJobOffer } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffer";
import { SelectOfferCard } from "@/features/restricted/empleador/selectOffersApplicants/components/selectOfferCard";
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
                <p>ID de oferta no válido.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen items-center justify-center">
                <LoadingScreen></LoadingScreen>
                <p>Cargando oferta...</p>
            </div>
        );
    }

    if (error || !offer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-black mb-4">Oferta no encontrada</h2>
                <Link href="/empleador/selectedOffer" className="text-blue-500 underline">
                    Volver a ofertas
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-5xl mx-auto py-8 px-4 md:px-0">
            {/* Botón de volver */}
            <Link 
                href="/empleador/selectedOffer"
                className="inline-flex items-center gap-2 text-[#1a4b9e] font-bold mb-6 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
            >
                <ArrowLeft size={20} />
                Volver a mis ofertas
            </Link>

            {/* Sección superior: Previsualización de la oferta */}
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Detalle de la Oferta</h1>
                <div className="pointer-events-none">
                    <SelectOfferCard offer={offer} />
                </div>
            </div>

            {/* Sección inferior: Lista de Postulantes */}
            <div className="border-t border-gray-100 pt-8">
                <ApplicantsList offerId={id} />
            </div>
        </div>
    );
}