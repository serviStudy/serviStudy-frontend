import { RequirementDTO } from "@/features/misPostulaciones/types/offersTypes";
import { OfferRequeriment } from "@/features/ofertasActivas/types/ofertasActivas.types";

interface Props {
    requirements: OfferRequeriment[];
}

export const DetailRequirementsPostulation = ({ requirements }: Props) => {
    if (!requirements || requirements.length === 0) return null;

    return (
        <div className="mt-8">
        <h2 className="text-gray-600 font-bold text-sm mb-3">
            Habilidades y Requisitos Clave
        </h2>
        <div className="flex flex-wrap gap-2">
            {requirements.map((req, index) => (
            <span
                key={req.requirementName ||  index}
                className="bg-[#DDEBFF] text-[#557ab5] text-xs font-semibold px-4 py-1.5 rounded-full"
            >
                {req.requirementName ||  "Requisito"}
            </span>
            ))}
        </div>
        </div>
    );
};
