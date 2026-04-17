import { RequirementDTO } from "../../types/jobOffer.types";

interface Props {
  requirements: RequirementDTO[];
}

export const OfferDetailRequirements = ({ requirements }: Props) => {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-gray-600 font-bold text-sm mb-3">
        Habilidades y Requisitos Clave
      </h2>
      <div className="flex flex-wrap gap-2">
        {requirements.map((req, index) => (
          <span
            key={req.id_requirement || req.idRequirement || index}
            className="bg-[#DDEBFF] text-[#557ab5] text-xs font-semibold px-4 py-1.5 rounded-full"
          >
            {req.requirementName || req.name || "Requisito"}
          </span>
        ))}
      </div>
    </div>
  );
};
