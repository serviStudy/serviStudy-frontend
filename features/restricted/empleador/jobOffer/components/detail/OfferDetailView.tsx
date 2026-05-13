"use client";

import { useJobOffer } from "../../hooks/useJobOffer";
import { OfferDetailHeader } from "./OfferDetailHeader";
import { OfferDetailInfoCards } from "./OfferDetailInfoCards";
import { OfferDetailRequirements } from "./OfferDetailRequirements";
import { FileText, ClipboardList, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  id: string;
}

export const OfferDetailView = ({ id }: Props) => {
  const { offer, loading, error } = useJobOffer(id);

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

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-0">
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
        className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-50 overflow-hidden"
      >
        <OfferDetailHeader offer={offer} />

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:gap-8">
          <OfferDetailInfoCards offer={offer} />

          {/* Contract Details */}
          <div>
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-inner">
                <FileText size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Detalles de Contratación</h2>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-8 text-sm sm:text-base text-gray-600 font-medium leading-relaxed whitespace-pre-line shadow-inner">
              {offer.contract_description || (offer as any).contractDescription || <span className="text-gray-300 italic">No especificado</span>}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-[18px] bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shadow-inner">
                <ClipboardList size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Descripción del Puesto</h2>
            </div>
            <div className="bg-green-50/40 border border-green-100 rounded-2xl p-5 sm:p-8 text-sm sm:text-base text-gray-700 font-medium leading-relaxed whitespace-pre-line">
              {offer.description || (offer as any).dutiesDescription || (offer as any).duties_description || "Sin descripción adicional."}
            </div>
          </div>

          <OfferDetailRequirements requirements={offer.requirements} />
        </div>
      </motion.div>
    </div>
  );
};
