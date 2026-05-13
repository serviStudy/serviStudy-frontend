"use client";

import { use } from "react";
import { useJobOffer } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffer";
import { OfferCard } from "@/features/restricted/empleador/jobOffer/components/OfferCard";
import { ApplicantsList } from "@/features/restricted/empleador/applicantsEmployer/components/ApplicantsList";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { Button } from "@/components/ui/button";
import { ListApplicant } from "@/features/restricted/empleador/compatibility/components/ListApplicant";
import { Offer } from "@/features/restricted/empleador/compatibility/components/Offer";

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
        <div className="min-h-screen max-w-6xl mx-auto py-4 px-4 md:px-0">

            <div className="w-full p-4.5 flex align-middle mb-6 top-0 fixed z-20 justify-between bg-white/30 backdrop-blur-md">
                <Link 
                    href="/empleador/ofertas"
                    className="inline-flex items-center gap-2 text-green-600 font-bold text-sm hover:bg-green-50 px-4 py-2 rounded-xl transition-all"
                >
                    <ArrowLeft size={18} />
                    Volver a mis ofertas
                </Link>

                <Link href={`/empleador/compatibility/${id}/resultCompatibility`}>
                    <Button className="flex gap-2 py-0.5 px-2 z-20 cursor-pointer -translate-x-88 text-white text-[15px] bg-linear-to-r from-green-500 to-blue-500">
                        <Sparkles/>
                        Realizar compatibilidad
                    </Button>
                </Link>
            </div>

            {/* Sección superior: Previsualización de la oferta */}
            <div className="my-8 pt-6">
                <div className="pointer-events-none">
                    <Offer offer={offer} showActions={false} />
                </div>
            </div>

            <hr className="h-[1px] bg-linear-to-r from-green-300 to-blue-300"/>

            {/* Sección inferior: Lista de Postulantes */}
            <div className="mt-8">
                <ListApplicant offerId={id} />
            </div>
        </div>
    );
}