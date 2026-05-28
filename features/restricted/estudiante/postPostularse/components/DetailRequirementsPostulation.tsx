import { OfferRequeriment } from "@/features/restricted/estudiante/ofertasActivas/types/ofertasActivas.types";
import { CheckCircle2 } from "lucide-react";

interface Props {
    requirements: OfferRequeriment[];
}

export const DetailRequirementsPostulation = ({ requirements }: Props) => {
    if (!requirements || requirements.length === 0) return null;

    return (
        <div className="my-7">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-900 p-2 rounded-xl">
                    <CheckCircle2 size={20} className="text-white" />
                </div>
                <h2 className="text-blue-900 font-semibold text-lg">Habilidades y Requisitos</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
                {requirements.map((req, index) => (
                    <span
                        key={req.requirementName || index}
                        className="flex items-center gap-2 bg-[#DDEBFF] text-[#2552d0] text-sm font-semibold px-4 py-2 rounded-2xl capitalize"
                    >
                        <span className="w-3 h-3 rounded-full bg-[#2552d0] shrink-0" />
                        {req.requirementName || "Requisito"}
                    </span>
                ))}
            </div>
        </div>
    );
};
