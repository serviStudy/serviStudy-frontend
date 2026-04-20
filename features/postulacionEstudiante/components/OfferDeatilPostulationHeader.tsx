import { JobOfferDTO } from "@/features/restricted/employer/jobOffer/types/jobOffer.types";
import { MapPin, Edit } from "lucide-react";
import Link from "next/link";

interface Props {
  offer: JobOfferDTO;
}

export const OfferDetailPostulationHeader = ({ offer }: Props) => {
  return (
    <div className="bg-[#EBF3FF] rounded-t-3xl p-6 md:p-8 flex items-start gap-6 relative">
      {/* Placeholder del logo */}
      <div className="w-24 h-24 bg-[#D9D9D9] rounded-lg shrink-0 mt-2"></div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-[#1a3683]">
            {offer.title}
          </h1>
        </div>
        
        <div className="mt-4 flex items-start gap-2 text-[#1a3683]">
          <MapPin size={22} className="shrink-0 mt-0.5" />
          <p className="font-semibold leading-tight">
            <span className="block whitespace-pre-line">{offer.establishment_address || (offer as any).establishmentAddress}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
