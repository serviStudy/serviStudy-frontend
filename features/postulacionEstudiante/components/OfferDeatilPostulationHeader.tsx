import { ActiveOffer } from "@/features/ofertasActivas/types/ofertasActivas.types";
import { MapPin, Edit } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

interface Props {
  offer: ActiveOffer;
}

export const OfferDetailPostulationHeader = ({ offer }: Props) => {
  return (
    <div className="bg-[#EBF3FF] rounded-t-3xl p-6 md:p-8 flex items-start gap-6 relative">
      {/* Placeholder del logo */}
      <div className="w-32 absolute lg:top-16 h-24 bg-[#D9D9D9] rounded-lg shrink-0 mt-2">
        <Image
            width={128}
            height={96}
            src={offer.imageUrl}
            alt={offer.title}
            className='object-cover rounded-[10px]'                 
        />
      </div>
      
      <div className="flex-1 space-y-0 pl-36 flex-col">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl mb-0 font-bold text-[#1a3683]">
            {offer.title}
          </h1>
        </div>

        <div>
          <p className="font-bold text-[#1a3683] text-[17px]">{offer.businessName}</p>
        </div>
        
        <div className="mt-4 flex items-start gap-2 text-[#1a3683]">
          <MapPin size={22} className="shrink-0 mt-0.5" />
          <p className="font-semibold leading-tight">
            <span className="block whitespace-pre-line">{offer.establishmentAddress}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
