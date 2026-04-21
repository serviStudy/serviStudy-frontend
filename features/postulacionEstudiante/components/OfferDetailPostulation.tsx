"use client";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { OfferDetailInfoCards } from "@/features/restricted/employer/jobOffer/components/detail/OfferDetailInfoCards";
import { OfferDetailRequirements } from "@/features/restricted/employer/jobOffer/components/detail/OfferDetailRequirements";
import { OfferDetailSection } from "@/features/restricted/employer/jobOffer/components/detail/OfferDetailSection";
import { useJobOffer } from "@/features/restricted/employer/jobOffer/hooks/useJobOffer";
import { FileText, ClipboardList } from "lucide-react";
import { ApplyButton } from "./ApplyButton";
import { OfferDetailPostulationHeader } from "./OfferDeatilPostulationHeader";

interface Props {
    id: string;
}

export const OfferDetailPostulation = ({ id }: Props) => {
    const { offer, loading, error } = useJobOffer(id);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 font-medium">Cargando oferta...</p>
        </div>
        );
    }

    if (error || !offer) {
        return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <p className="text-transparent">{error || "No se encontró la oferta"}</p>
            <LoadingScreen />
        </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] w-full max-w-3xl mx-auto">
                <OfferDetailPostulationHeader offer={offer}  />
                
                <div className="p-6 md:p-10 pt-4">
                <OfferDetailInfoCards offer={offer} />

                <OfferDetailSection 
                    title="Detalles de contratación" 
                    icon={<FileText size={20} />}
                >
                    {offer.contractDescription}
                </OfferDetailSection>

                {/* Fallback to summary if duties_description empty? Using the added field. */}
                <div className="mb-8 pt-7">
                    <h2 className="text-xl font-bold text-[#1a3683] mb-4 flex items-center gap-2">
                    <ClipboardList size={22} className="text-orange-500" />
                    Labores y descripción del puesto
                    </h2>
                    <div className="bg-[#eff4ff] border border-[#d6e4ff] rounded-xl p-5 text-[#3b528b] font-medium leading-relaxed whitespace-pre-line text-sm">
                        {offer.description}
                    </div>
                </div>

                <OfferDetailRequirements requirements={offer.requirements} />
                </div>

                <div className="max-w-3xl mx-9 pb-6">
                    {offer.jobOfferId && (
                        <ApplyButton offerId={offer.jobOfferId}></ApplyButton>    
                    )}
                </div>
            </div>
        </div>
    );
};