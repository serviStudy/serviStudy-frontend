"use client";

import { JobOfferDTO } from "../../types/jobOffer.types";
import { MapPin, Pencil } from "lucide-react";
import Link from "next/link";
import { useEmployerProfile } from "@/features/profile/employer/hooks/useEmployerProfile";

interface Props {
  offer: JobOfferDTO;
}

export const OfferDetailHeader = ({ offer }: Props) => {
  const { profile } = useEmployerProfile();
  const imageUrl = profile?.imageUrl || (profile as any)?.image_url;
  const offerId = offer.jobOfferId || offer.id;

  return (
    <div className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-600 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="relative z-10 p-10 lg:p-16 flex flex-col sm:flex-row items-center sm:items-end gap-8">
        {/* Logo */}
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[32px] shrink-0 overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
          {imageUrl ? (
            <img src={imageUrl} alt="Empresa" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-300 flex items-center justify-center text-white text-6xl font-black">
              {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">


          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-6">
            {offer.title}
          </h1>

          <div className="flex items-center gap-3 text-white/80 font-bold justify-center sm:justify-start">
            <MapPin size={20} className="shrink-0 text-green-300" />
            <span className="text-lg">{offer.establishment_address || (offer as any).establishmentAddress}</span>
          </div>
        </div>

        {/* Edit Button */}
        <Link
          href={`/empleador/ofertas/${offerId}/editar`}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-green-700 transition-all shadow-xl shrink-0 group"
        >
          <Pencil size={18} className="group-hover:rotate-12 transition-transform" />
          Editar
        </Link>
      </div>
    </div>
  );
};
