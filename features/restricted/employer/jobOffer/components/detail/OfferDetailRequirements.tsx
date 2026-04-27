import { RequirementDTO } from "../../types/jobOffer.types";
import { CheckCircle2 } from "lucide-react";

interface Props {
  requirements: RequirementDTO[];
}

export const OfferDetailRequirements = ({ requirements }: Props) => {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-[18px] bg-gray-900 flex items-center justify-center text-white shadow-lg">
          <CheckCircle2 size={22} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Habilidades y Requisitos</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {requirements.map((req, index) => (
          <span
            key={req.id_requirement || req.idRequirement || index}
            className="flex items-center gap-2 bg-white border border-gray-100 text-gray-700 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider shadow-sm hover:border-green-200 hover:text-green-700 hover:bg-green-50 transition-all cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            {req.requirementName || req.name || "Requisito"}
          </span>
        ))}
      </div>
    </div>
  );
};
