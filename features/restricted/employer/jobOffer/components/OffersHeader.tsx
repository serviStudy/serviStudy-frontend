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
    <div className="bg-white rounded-xl shadow p-5 mb-6">
      {/* Botón superior */}
      <div className="flex justify-end mb-4">
        <Link
          href="/empleador/(offers)/create-offer"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={16} />
          Publicar nueva oferta
        </Link>
      </div>

      {/* Título */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-blue-700">Mis ofertas</h2>
        <p className="text-sm text-gray-500">
          Tienes 2 postulaciones activas
        </p>
      </div>

      {/* Filtros */}
      <div className="flex justify-center gap-3 mt-4 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-600">
          <Filter size={14} />
          Filtros
        </button>

        <button
          onClick={() => handleFilter("ACTIVE")}
          className={`px-4 py-2 rounded-lg text-sm ${
            active === "ACTIVE"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Activas
        </button>

        <button
          onClick={() => handleFilter("DISABLED")}
          className={`px-4 py-2 rounded-lg text-sm ${
            active === "DISABLED"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Desactivadas
        </button>
      </div>
    </div>
  );
};