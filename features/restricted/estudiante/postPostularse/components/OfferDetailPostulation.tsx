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

    // Limpia el bloque |||CONTRACT... de la descripción
    const cleanDescription = (raw: string) => raw.split("|||")[0].trim();

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] w-full max-w-3xl mx-auto overflow-hidden">

                <OfferDetailPostulationHeader offer={offer} />

                <div className="p-6 md:p-10 pt-6">
                    {/* Tarjetas de info: salario, jornada, días */}
                    <OfferDetailInfoPostulation offer={offer} />

                    {/* Detalles de contratación */}
                    <DetailSectionPostulation
                        title="Detalles de Contratación"
                        icon={<FileText size={20} />}
                        iconBg="bg-[#2552d0]"
                    >
                        {offer.salaryDescription}
                    </DetailSectionPostulation>

                    {/* Descripción / Labores del puesto */}
                    <DetailSectionPostulation
                        title="Descripción del Puesto"
                        icon={<ClipboardList size={20} />}
                        iconBg="bg-orange-500"
                    >
                        {cleanDescription(offer.description)}
                    </DetailSectionPostulation>

                    {/* Habilidades y Requisitos */}
                    <DetailRequirementsPostulation requirements={offer.requirements} />

                    {/* Botón postularse */}
                    {offer.jobOfferId && (
                        <div className="mt-10 pb-2">
                            <ApplyButton offerId={offer.jobOfferId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};