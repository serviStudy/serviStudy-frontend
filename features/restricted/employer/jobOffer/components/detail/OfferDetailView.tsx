"use client";

import { useJobOffer } from "../../hooks/useJobOffer";
import { OfferDetailHeader } from "./OfferDetailHeader";
import { OfferDetailInfoCards } from "./OfferDetailInfoCards";
import { OfferDetailSection } from "./OfferDetailSection";
import { OfferDetailRequirements } from "./OfferDetailRequirements";
import { FileText } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
}

export const OfferDetailView = ({ id }: Props) => {
  const { offer, loading, error } = useJobOffer(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 font-medium">Cargando oferta...</p>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error || "No se encontró la oferta"}</p>
        <Link href="/empleador/offers" className="text-blue-600 underline">
          Volver a ofertas
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <Link href="/empleador/offers" className="text-blue-600 hover:underline mb-4 inline-block font-medium">
        ← Volver
      </Link>
      
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] w-full max-w-3xl mx-auto">
        <OfferDetailHeader offer={offer} />
        
        <div className="p-6 md:p-10 pt-4">
          <OfferDetailInfoCards offer={offer} />

          <OfferDetailSection 
            title="Detalles de contratación" 
            icon={<FileText size={20} />}
          >
            {offer.contract_description}
          </OfferDetailSection>

          {/* Fallback to summary if duties_description empty? Using the added field. */}
          <div className="mt-8">
            <h2 className="text-[#1a3683] font-bold text-lg mb-4">
              Labores y descripción del puesto
            </h2>
            <div className="bg-[#eff4ff] border border-[#d6e4ff] rounded-xl p-5 text-[#3b528b] font-medium leading-relaxed whitespace-pre-line text-sm">
              {offer.duties_description || "Sin descripción de labores adicionales."}
            </div>
          </div>

          <OfferDetailRequirements requirements={offer.requirements} />
        </div>
      </div>
    </div>
  );
};

// Aliasing for internal usage inside the component return
const DetailSection = OfferDetailSection;
