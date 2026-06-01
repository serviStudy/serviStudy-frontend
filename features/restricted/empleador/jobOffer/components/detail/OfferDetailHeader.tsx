"use client";

import { JobOfferDTO } from "../../types/jobOffer.types";
import { MapPin, Pencil, Users } from "lucide-react";
import Link from "next/link";
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";
import Image from "next/image";

interface Props {
  offer: JobOfferDTO;
  rutaSubscription?: string;
}

export const OfferDetailHeader = ({ offer, rutaSubscription }: Props) => {
  const { profile } = useEmployerProfile();
  const imageUrl = profile?.imageUrl || (profile as any)?.image_url;
  const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-600 rounded-t-3xl p-6 sm:p-8 md:p-9 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-green-300 opacity-10 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 sm:gap-6 z-10 w-full md:w-auto text-center sm:text-left">
        {/* Logo */}
        <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-white/40 flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Empresa" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl font-extrabold text-green-700">
                {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 min-w-0 items-center sm:items-start w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight capitalize text-center sm:text-left">
            {offer.title}
          </h1>
          <p className="text-green-200 font-semibold text-lg md:text-xl capitalize text-center sm:text-left">
            {profile?.businessName || (profile as any)?.business_name || "Tu Empresa"}
          </p>
          <div className="flex items-center gap-1.5 text-green-100 mt-1 justify-center sm:justify-start">
            <MapPin size={16} className="shrink-0" />
            <span className="text-sm font-medium leading-tight capitalize text-center sm:text-left">
              {offer.establishment_address || (offer as any).establishmentAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Button Panel */}
      <div className="z-10 mt-2 sm:mt-4 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row gap-3 justify-center sm:justify-end items-center">
        {rutaSubscription && (
          <Link
            href={rutaSubscription}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all shadow-sm w-full sm:w-auto active:scale-95 group text-sm"
          >
            <Users size={18} className="shrink-0" />
            <span>Ver Postulantes</span>
          </Link>
        )}
        <Link
          href={`/empleador/ofertas/${offerId}/editar`}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all shadow-sm w-full sm:w-auto group text-sm"
        >
          <Pencil size={18} className="group-hover:rotate-12 transition-transform shrink-0" />
          <span>Editar</span>
        </Link>
      </div>
    </div>
  );
};
