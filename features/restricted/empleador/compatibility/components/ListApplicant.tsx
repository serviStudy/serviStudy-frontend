"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Users, CheckCircle2 } from "lucide-react";
import { PaginatedApplicants } from "../../applicantsEmployer/types/applicants.types";
import { getApplicantsByOfferId } from "../../applicantsEmployer/services/applicants.service";
import { Applicant } from "./Applicant";

    interface Props {
        offerId: string;
        selectedIds: string[];
        onToggleSelection: (id: string) => void;
        resultsIA?: any
    }
    
    export const ListApplicant = ({ offerId, selectedIds, onToggleSelection, resultsIA = []}: Props) => {
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
            <Loader2 className="w-10 h-10 animate-spin text-green-600 mb-4" />
            <p className="font-semibold text-base">Cargando postulantes...</p>
        </div>
        );
    }


    if (error) {
        return (
        <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-xl flex flex-col items-center text-center max-w-2xl mx-auto mt-8">
            <AlertCircle size={40} className="mb-4 text-red-500" />
            <h3 className="text-lg font-bold mb-2">Error al cargar</h3>
            <p className="font-medium text-sm">{error}</p>
            <button 
            onClick={() => fetchApplicants(page)}
            className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors active:scale-95"
            >
            Reintentar
            </button>
        </div>
        );
    }

    if (!data || data.empty || data.content.length === 0) {
        return (
        <div className="bg-white border border-gray-200 text-gray-500 p-12 rounded-xl flex flex-col items-center text-center max-w-3xl mx-auto mt-8 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
            <Users size={36} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no hay postulantes</h3>
            <p className="font-medium text-sm max-w-md">
            Esta oferta no ha recibido postulaciones todavía. Las nuevas postulaciones aparecerán aquí en cuanto los estudiantes apliquen.
            </p>
        </div>
        );
    }

    return (
        <div className="mt-8 flex flex-col gap-6">
        
        {/* Header Info */}
        <div className="items-center justify-between hidden md:block">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                <Users size={20} />
            </div>
            <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 via-lime-600 to-green-600 text-transparent bg-clip-text ">Lista de Postulantes</h2>
            </div>
            <div className="flex flex-col items-end gap-2">
                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                        <CheckCircle2 size={12} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-700  tracking-wider">
                            {selectedIds.length} {selectedIds.length === 1 ? "seleccionado" : "seleccionados"}
                        </span>
                    </div>
                )}
                <span className="bg-linear-to-r from-green-50 to-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-xs border border-blue-100/50">
                {data.totalElements} en total
                </span>
            </div>
        </div>

        {/* List */}
        <div className="space-y-4">
            {[...data.content].sort((a, b) => {
                const scoreA = resultsIA?.[a.student.studentProfileId] || 0;
                const scoreB = resultsIA?.[b.student.studentProfileId] || 0;
                return scoreB - scoreA;
            }).map((applicant) => {

                // Se accede directamente al diccionario (Objeto) usando el ID del estudiante
                const score = resultsIA?.[applicant.student.studentProfileId];

                return (
                    <Applicant 
                        key={applicant.applicantId} 
                        applicant={applicant} 
                        isSelected={selectedIds.includes(applicant.student.studentProfileId)}
                        onSelect={onToggleSelection}
                        resultsIA={score}
                    />
                )
            })}
        </div>

        {/* Pagination Controls */}
        {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-200 w-fit mx-auto">
            <button
                onClick={() => fetchApplicants(page - 1)}
                disabled={data.first || loading}
                className="px-5 py-2 rounded-lg font-bold text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Anterior
            </button>
            
            <span className="text-sm font-semibold text-gray-700">
                Página {page + 1} de {data.totalPages}
            </span>
            
            <button
                onClick={() => fetchApplicants(page + 1)}
                disabled={data.last || loading}
                className="px-5 py-2 rounded-lg font-bold text-sm bg-linear-to-r from-blue-400 via-lime-500 to-green-600 text-white hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Siguiente
            </button>
            </div>
        )}

        {/* Loading overlay for pagination */}
        {loading && data && (
            <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 border border-gray-200">
                    <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                    <span className="font-semibold text-gray-800 text-base">Cargando...</span>
                </div>
            </div>
        )}
        </div>
    );
};
