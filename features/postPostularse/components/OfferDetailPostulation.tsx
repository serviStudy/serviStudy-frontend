"use client";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { FileText, ClipboardList } from "lucide-react";
import { OfferDetailPostulationHeader } from "./OfferDeatilPostulationHeader";
import { DetailSectionPostulation } from "./DetailSeccionPostulation";
import { useActiveOffer } from "../hooks/useActiveOffer";
import { OfferDetailInfoPostulation } from "./OfferDetailInfoPostulation";
import { DetailRequirementsPostulation } from "./DetailRequirementsPostulation";
import { ApplyButton } from "./ApplyButton";

interface Props {
    id: string;
}

export const OfferDetailPostulation = ({ id }: Props) => {
    const { offer, error } = useActiveOffer(id);

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
                    <OfferDetailInfoPostulation offer={offer} />

                    <DetailSectionPostulation 
                        title="Detalles de contratación" 
                        icon={<FileText size={20} />}
                    >
                        {offer.salaryDescription}
                    </DetailSectionPostulation>

                    {/* Fallback to summary if duties_description empty? Using the added field. */}
                    <div className="mb-8 pt-7">
                        <h2 className="text-xl font-bold text-[#1a3683] mb-4 flex items-center gap-2">
                        <ClipboardList size={22} className="text-orange-500" />Labores y descripción del puesto</h2>
                        <div className="bg-[#eff4ff] border border-[#d6e4ff] rounded-xl p-5 text-[#3b528b] font-medium leading-relaxed whitespace-pre-line text-sm">
                            {offer.description.split("|||")[0].trim()}
                        </div>
                    </div>

                    <DetailRequirementsPostulation requirements={offer.requirements} />
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