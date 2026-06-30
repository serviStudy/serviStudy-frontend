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
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
    const { id } = use(params);
    const { offer, loading, error } = useJobOffer(id);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [resultCompatibility, setResultCompatibility] = useState([])
    
    const { profile } = useEmployerProfile();
    const imageUrl = profile?.imageUrl || (profile as any)?.image_url;
    
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
        <div className="min-h-screen relative w-[92vw] lg:w-[65vw] xl:w-auto">
            {/* Premium Background Elements */}
            <div className="fixed inset-0 bg-linear-to-br from-green-50/60 via-white to-blue-50/60 -z-10 pointer-events-none" />
            <div className="fixed top-[-10%] right-[-5%] w-125 h-125 bg-blue-400/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-5%] w-125 h-125 bg-green-400/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

            {/* Edge-to-edge sticky top bar */}
            <div className="sticky top-16 lg:top-0 z-50 w-auto bg-white/20 backdrop-blur-xl border-b border-gray-200/60 -mx-4 md:-mx-8 lg:-mx-10 -mt-4 md:-mt-8 lg:-mt-10 px-4 md:px-8 lg:px-10 py-3 mb-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-all">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link 
                        href="/empleador/ofertas"
                        className="inline-flex items-center gap-2 text-green-700 font-bold text-sm hover:bg-white/50 px-4 py-2 rounded-xl transition-all"
                    >
                        <ArrowLeft size={18} />
                        <span className="hidden sm:inline">Volver a mis ofertas</span>
                        <span className="sm:hidden">Volver</span>
                    </Link>

                    <ApplyCompatibility offerId={id} selectedIds={selectedIds} onAnalisysComplete={setResultCompatibility}/>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-4 px-4 md:px-0 relative z-10">
                {/* Sección superior: Previsualización de la oferta */}
                <div className="sm:mt-14 lg:mt-2">
                    <div className="pointer-events-none capitalize rounded-3xl shadow-xl shadow-blue-900/5">
                        <div className="bg-white/80 backdrop-blur-md rounded-[22px]">
                            <Offer offer={offer} showActions={false} imageUrl={imageUrl} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center my-5 md:my-10 relative">
                    <hr className="absolute w-full h-px border-0 bg-linear-to-r from-blue-200 via-lime-400 to-green-400 opacity-50"/>
                    <div className="bg-white/80 backdrop-blur-sm px-4 relative z-10 rounded-full border border-blue-100 shadow-sm flex items-center gap-2 text-blue-800 text-xs font-bold py-1.5">
                        <Sparkles size={12} className="text-blue-500" />
                        Análisis de Compatibilidad
                        <Sparkles size={12} className="text-green-500" />
                    </div>
                </div>

                {/* Sección inferior: Lista de Postulantes */}
                <div className="mt-6 mb-20">
                    <ListApplicant 
                        offerId={id} 
                        selectedIds={selectedIds}
                        onToggleSelection={handleToggleSelection}
                        resultsIA={resultCompatibility}
                    />
                </div>
            </div>
        </div>
    );
}

