"use client";

import { useEffect, useState } from "react";
import { ApplicantDTO, PaginatedApplicants } from "../types/applicants.types";
import { getApplicantsByOfferId } from "../services/applicants.service";
import { ApplicantCard } from "./ApplicantCard";
import { Loader2, AlertCircle, Users } from "lucide-react";

interface Props {
  offerId: string;
}

export const ApplicantsList = ({ offerId }: Props) => {
  const [data, setData] = useState<PaginatedApplicants | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const size = 10;

  const fetchApplicants = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getApplicantsByOfferId(offerId, pageNumber, size);
      setData(res);
      setPage(pageNumber);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al cargar los postulantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (offerId) {
      fetchApplicants(0);
    }
  }, [offerId]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="w-12 h-12 animate-spin text-[#1a4b9e] mb-4" />
        <p className="font-bold text-lg">Cargando postulantes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-3xl flex flex-col items-center text-center max-w-2xl mx-auto mt-8">
        <AlertCircle size={48} className="mb-4 text-red-500" />
        <h3 className="text-xl font-black mb-2">Error al cargar</h3>
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => fetchApplicants(page)}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data || data.empty || data.content.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-100 text-gray-500 p-12 rounded-[2.5rem] flex flex-col items-center text-center max-w-3xl mx-auto mt-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
          <Users size={40} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-black text-gray-800 mb-3">Aún no hay postulantes</h3>
        <p className="font-medium max-w-md">
          Esta oferta no ha recibido postulaciones todavía. Las nuevas postulaciones aparecerán aquí en cuanto los estudiantes apliquen.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      
      {/* Header Info */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black text-[#1a4b9e] flex items-center gap-3">
          <Users className="text-[#28a745]" />
          Lista de Postulantes
        </h2>
        <span className="bg-[#1a4b9e]/10 text-[#1a4b9e] px-4 py-1.5 rounded-full font-black text-sm">
          {data.totalElements} en total
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {data.content.map((applicant, idx) => (
          <ApplicantCard key={idx} applicant={applicant} />
        ))}
      </div>

      {/* Pagination Controls */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 bg-white p-4 rounded-full shadow-sm border border-gray-100 w-fit mx-auto">
          <button
            onClick={() => fetchApplicants(page - 1)}
            disabled={data.first || loading}
            className="px-6 py-2 rounded-full font-bold text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          
          <span className="text-sm font-black text-[#1a4b9e]">
            Página {page + 1} de {data.totalPages}
          </span>
          
          <button
            onClick={() => fetchApplicants(page + 1)}
            disabled={data.last || loading}
            className="px-6 py-2 rounded-full font-bold text-sm bg-[#1a4b9e] text-white hover:bg-[#123675] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Loading overlay for pagination */}
      {loading && data && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#1a4b9e]" />
            <span className="font-bold text-gray-800 text-lg">Cargando...</span>
          </div>
        </div>
      )}
    </div>
  );
};
