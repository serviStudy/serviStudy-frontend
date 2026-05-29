"use client";

import { useJobOffer } from "../../hooks/useJobOffer";
import { OfferDetailHeader } from "./OfferDetailHeader";
import { OfferDetailInfoCards } from "./OfferDetailInfoCards";
import { OfferDetailRequirements } from "./OfferDetailRequirements";
import { OfferDetailSection } from "./OfferDetailSection";
import { ClipboardList, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { JobOfferDTO } from "../../types/jobOffer.types";

interface Props {
  id: string;
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export const OfferDetailView = ({ id, subscriptionStatus = "INACTIVE" }: Props) => {
  const { offer, loading, error } = useJobOffer(id);
  const offerId = offer?.jobOfferId || offer?.id || (offer as any)?.idJobOffer;

  const rutaSubscription = subscriptionStatus === "ACTIVE"
  ? `/empleador/compatibility/${offerId}`
  : `/empleador/applicants/${offerId}`;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Cargando oferta...</p>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-400 text-4xl font-black shadow-inner">!</div>
        <p className="text-gray-400 font-bold text-lg">{error || "No se encontró la oferta"}</p>
        <Link href="/empleador/ofertas" className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-900/20">
          Volver a Ofertas
        </Link>
      </div>
    );
  }

  const cleanDescription = (raw: string) => raw ? raw.split("|||")[0].trim() : "";

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-4">
      {/* Back Link */}
      <Link
        href="/empleador/ofertas"
        className="inline-flex items-center gap-3 text-gray-400 hover:text-green-600 font-bold text-sm uppercase tracking-widest mb-6 transition-colors group"
      >
        <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-green-50 group-hover:border-green-100 transition-all">
          <ArrowLeft size={18} />
        </div>
        Volver a Ofertas
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] w-full overflow-hidden"
      >
        <OfferDetailHeader offer={offer} />

        <div className="p-6 pt-2 md:p-10 md:pt-6 flex flex-col lg:flex-row justify-between gap-8">
          <div className="lg:w-[32%] shrink-0">
            <OfferDetailInfoCards offer={offer} />
          </div>

          <div className="lg:w-[65%]">
            <OfferDetailRequirements requirements={offer.requirements} />

            <hr className="mb-8 border-gray-100" />

            {/* Descripción del puesto */}
            <OfferDetailSection
              title="Descripción del Puesto"
              icon={<ClipboardList size={20} />}
              iconBg="bg-orange-600"
            >
              {cleanDescription(offer.description || (offer as any).dutiesDescription || (offer as any).duties_description || "Sin descripción adicional.")}
            </OfferDetailSection>
          </div>

          <div className="md:hidden w-full">
            <Button className="flex bg-whit items-center gap-3 px-8 py-1 rounded-xl text-xs font-bold transition-all border-2 border-green-600 text-green-600 hover:bg-green-50 active:scale-95 uppercase tracking-wider">
              <Link 
                href={rutaSubscription} 
              >
                <div className="flex gap-2">
                  <Users size={16} className="group-hover/applicants:scale-110 transition-transform" />
                  Ver Postulantes
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
