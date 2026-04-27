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
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Cargando oferta...</p>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 bg-red-50 rounded-[28px] flex items-center justify-center text-red-400 text-4xl font-black shadow-inner">!</div>
        <p className="text-gray-400 font-bold text-lg">{error || "No se encontró la oferta"}</p>
        <Link href="/empleador/ofertas" className="px-8 py-4 bg-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-900/20">
          Volver a Ofertas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 lg:px-0">
      {/* Back Link */}
      <Link
        href="/empleador/ofertas"
        className="inline-flex items-center gap-3 text-gray-400 hover:text-green-600 font-black text-sm uppercase tracking-widest mb-10 transition-colors group"
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
        className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 border border-gray-50 overflow-hidden"
      >
        <OfferDetailHeader offer={offer} />

        <div className="p-10 lg:p-16 flex flex-col gap-12">
          <OfferDetailInfoCards offer={offer} />

          {/* Contract Details */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[18px] bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-inner">
                <FileText size={22} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Detalles de Contratación</h2>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-[28px] p-8 text-gray-600 font-medium leading-relaxed whitespace-pre-line text-base shadow-inner">
              {offer.contract_description || (offer as any).contractDescription || <span className="text-gray-300 italic">No especificado</span>}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-[18px] bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shadow-inner">
                <ClipboardList size={22} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Descripción del Puesto</h2>
            </div>
            <div className="bg-green-50/40 border border-green-100 rounded-[28px] p-8 text-gray-700 font-medium leading-relaxed whitespace-pre-line text-base">
              {offer.description || (offer as any).dutiesDescription || (offer as any).duties_description || "Sin descripción adicional."}
            </div>
          </div>

          <OfferDetailRequirements requirements={offer.requirements} />
        </div>
      </motion.div>
    </div>
  );
};
