"use client";

import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { JobOfferStatus } from "../types/jobOffer.types";

interface Props {
  onFilterChange: (status: JobOfferStatus | "ALL") => void;
}

export const OfferHeader = ({ onFilterChange }: Props) => {
  const [active, setActive] = useState<JobOfferStatus | "ALL">("ACTIVE");

  const handleFilter = (status: JobOfferStatus | "ALL") => {
    setActive(status);
    onFilterChange(status);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm py-8 px-5 mb-8">
      {/* Título */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-[#143285] mb-2">Mis ofertas</h2>
        <p className="text-gray-500">
          Tienes 2 postulaciones activas
        </p>
      </div>

      {/* Filtros y acciones */}
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-full text-sm text-gray-400 hover:bg-gray-50 transition-colors">
          <Filter size={16} />
          Filtros
        </button>

        <button
          onClick={() => handleFilter("ACTIVE")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            active === "ACTIVE"
              ? "bg-[#1f42ad] text-white shadow-sm"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          Activada
        </button>

        <button
          onClick={() => handleFilter("DISABLED")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            active === "DISABLED"
              ? "bg-[#1f42ad] text-white shadow-sm"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          Desactivada
        </button>

        <Link
          href="/empleador/ofertas/crear"
          className="flex items-center gap-2 bg-[#1f42ad] hover:bg-[#143285] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ml-2"
        >
          <Plus size={16} />
          Publicar Nueva Oferta
        </Link>
      </div>
    </div>
  );
};