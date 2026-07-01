"use client";

import { useStudents } from "../hooks/useStudents";
import { StudentCard } from "./StudentCard";
import { Loader2, AlertCircle, Users } from "lucide-react";
import { StudentProfile, PaginatedStudents } from "../types/searchTalent.types";

interface Props {
  searchQuery?: string;
  manualResults?: PaginatedStudents | null;
}

export const StudentList = ({ searchQuery = "", manualResults }: Props) => {
  const { data: hookData, loading, error, page, setPage } = useStudents(0, 10, searchQuery);
  
  const data = manualResults || hookData;

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin text-green-600 mb-4" />
        <p className="font-semibold text-base">Buscando talento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-xl flex flex-col items-center text-center max-w-2xl mx-auto mt-8">
        <AlertCircle size={40} className="mb-4 text-red-500" />
        <h3 className="text-lg font-bold mb-2">Error al cargar estudiantes</h3>
        <p className="font-medium text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
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
        <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron estudiantes</h3>
        <p className="font-medium text-sm max-w-md">
          Aún no hay estudiantes registrados en la plataforma o no coinciden con los criterios de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
            <Users size={20} />
          </div>
          <h2 className="text-[16px] font-bold text-green-900 tracking-tight w-[20vw]">Estudiantes Disponibles</h2>
        </div>
        <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg font-bold text-xs border border-green-100">
          {data.totalElements} estudiantes
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {data.content.map((student: StudentProfile, index: number) => (
          <StudentCard key={student.id || student.userId || `student-${index}`} student={student} />
        ))}
      </div>

      {/* Pagination Controls */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-200 w-fit mx-auto">
          <button
            onClick={() => setPage(page - 1)}
            disabled={data.first || loading}
            className="px-5 py-2 rounded-lg font-bold text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          
          <span className="text-sm font-semibold text-gray-700">
            Página {page + 1} de {data.totalPages}
          </span>
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={data.last || loading}
            className="px-5 py-2 rounded-lg font-bold text-sm bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
