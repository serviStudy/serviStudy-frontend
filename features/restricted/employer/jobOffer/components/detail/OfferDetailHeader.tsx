import { JobOfferDTO } from "../../types/jobOffer.types";
import { MapPin, Edit } from "lucide-react";
import Link from "next/link";
import { useEmployerProfile } from "@/features/profile/employer/hooks/useEmployerProfile";

interface Props {
  offer: JobOfferDTO;
}

export const OfferDetailHeader = ({ offer }: Props) => {
  const { profile } = useEmployerProfile();
  const imageUrl = profile?.imageUrl || (profile as any)?.image_url;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-[#EBF3FF]/40 rounded-t-3xl p-6 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b border-blue-100/30">
      {/* Logo Wrapper */}
      <div className="w-28 h-28 bg-white rounded-2xl shrink-0 shadow-sm border border-blue-50/50 flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <img src={imageUrl} alt="Perfil" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#34c759] flex items-center justify-center text-white text-5xl font-bold">
            {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
          </div>
        )}
      </div>
      
      <div className="flex-1 text-center sm:text-left w-full mt-2 sm:mt-0">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a4b9e] leading-tight max-w-xl">
            {offer.title}
          </h1>
          <Link href={`/empleador/ofertas/${offer.jobOfferId || offer.id}/editar`} className="bg-white text-[#1a4b9e] p-3 rounded-full hover:bg-[#1a4b9e] hover:text-white border border-blue-200/50 shadow-sm transition-all hover:scale-105 hover:-translate-y-0.5 shrink-0">
            <Edit size={22} className="ml-[1px]" />
          </Link>
        </div>
        
        <div className="mt-5 flex items-start gap-2.5 text-[#1a4b9e]/80 justify-center sm:justify-start">
          <MapPin size={22} className="shrink-0 mt-0.5 text-blue-600" />
          <p className="font-semibold text-lg leading-relaxed text-[#143285]">
            <span className="block whitespace-pre-line">{offer.establishment_address || (offer as any).establishmentAddress}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
