"use client";
import { ActiveOffer } from "@/features/restricted/estudiante/ofertasActivas/types/ofertasActivas.types";
import { MapPin, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  offer: ActiveOffer;
}

export const OfferDetailPostulationHeader = ({ offer }: Props) => {
  const router = useRouter();

  const handleViewProfile = () => {
    sessionStorage.setItem("student_employer_view", JSON.stringify(offer));
    router.push("/estudiante/empleador");
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#1a3683] via-[#2552d0] to-[#3a6bf0] rounded-t-3xl p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

        <div className="flex items-center gap-6 z-10 w-full md:w-auto">
          {/* Logo */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-white/40">
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
          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
              {offer.title}
            </h1>
            <p className="text-blue-200 font-semibold text-lg md:text-xl">{offer.businessName}</p>
            <div className="flex items-center gap-1.5 text-blue-100 mt-1">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="text-sm font-medium leading-tight">{offer.establishmentAddress}</span>
            </div>
          </div>
        </div>

        {/* Botón Ver Perfil Empleador */}
        <div className="z-10 mt-4 md:mt-0 w-full md:w-auto flex justify-end">
          <button
            onClick={handleViewProfile}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all shadow-sm w-full md:w-auto"
          >
            <UserCircle2 size={18} />
            <span className="text-sm">Ver Perfil Empleador</span>
          </button>
        </div>
      </div>
    </>
  );
};
