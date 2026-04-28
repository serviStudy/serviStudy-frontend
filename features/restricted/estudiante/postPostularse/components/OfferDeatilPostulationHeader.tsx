import { ActiveOffer } from "@/features/restricted/estudiante/ofertasActivas/types/ofertasActivas.types";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface Props {
  offer: ActiveOffer;
}

export const OfferDetailPostulationHeader = ({ offer }: Props) => {
  return (
    <div className="bg-gradient-to-br from-[#1a3683] via-[#2552d0] to-[#3a6bf0] rounded-t-3xl p-7 md:p-9 flex items-center gap-6 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

      {/* Logo */}
      <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-white/40 z-10">
        {offer.imageUrl ? (
          <Image
            width={96}
            height={96}
            src={offer.imageUrl}
            alt={offer.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
            <span className="text-3xl font-extrabold text-[#2552d0]">
              {offer.title?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 z-10 min-w-0">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
          {offer.title}
        </h1>
        <p className="text-blue-200 font-semibold text-base">{offer.businessName}</p>
        <div className="flex items-center gap-1.5 text-blue-100 mt-1">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-sm font-medium leading-tight">{offer.establishmentAddress}</span>
        </div>
      </div>
    </div>
  );
};
