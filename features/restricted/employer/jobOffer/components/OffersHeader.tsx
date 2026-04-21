"use client";

import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { useState } from "react";
import { JobOfferStatus } from "../types/jobOffer.types";

interface Props {
  onFilterChange: (status: JobOfferStatus | "ALL") => void;
}

export const OfferHeader = ({ onFilterChange }: Props) => {
  const [active, setActive] = useState<JobOfferStatus | "ALL">("ALL");

  const handleFilter = (status: JobOfferStatus | "ALL") => {
    setActive(status);
    onFilterChange(status);
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 border border-gray-100 rounded-3xl shadow-sm py-10 px-8 mb-10">
      {/* Título */}
      <div className="text-center mb-8 flex flex-col items-center">
        <h2 className="text-[32px] md:text-4xl font-extrabold text-[#1a4b9e] mb-3 tracking-tight">Gestión de Ofertas</h2>
        <p className="text-gray-500 font-medium text-sm md:text-base max-w-md">
          Administra tus vacantes activas y encuentra al candidato ideal para tu empresa.
        </p>
      </div>

      {/* Filtros y acciones */}
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-gray-100 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:border-gray-200 transition-all">
          <Filter size={16} className="text-[#1a4b9e]" />
          Filtros avanzados
        </button>

        <button
          onClick={() => handleFilter("ALL")}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            active === "ALL"
              ? "bg-[#1a4b9e] text-white shadow-md shadow-blue-900/20"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Todas
        </button>

        <button
          onClick={() => handleFilter("ACTIVE")}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            active === "ACTIVE"
              ? "bg-[#1a4b9e] text-white shadow-md shadow-blue-900/20"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Activas
        </button>

        <button
          onClick={() => handleFilter("DISABLED")}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
            active === "DISABLED"
              ? "bg-[#1a4b9e] text-white shadow-md shadow-blue-900/20"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Inactivas
        </button>

        <Link
          href="/empleador/ofertas/crear"
          className="flex items-center gap-2 bg-gradient-to-r from-[#1a4b9e] to-[#2552d0] hover:from-[#143285] hover:to-[#1a4b9e] text-white px-8 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ml-0 md:ml-4"
        >
          <Plus size={18} />
          Publicar nueva oferta
        </Link>
      </div>
    </div>
  );
};