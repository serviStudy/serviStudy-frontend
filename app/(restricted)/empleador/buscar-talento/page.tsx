"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { StudentList } from '@/features/restricted/empleador/searchTalent/components/StudentList';

export default function BuscarTalentoPage() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight">Buscar Talento</h1>
          <p className="text-gray-400 font-bold mt-1">
            Encuentra a los mejores estudiantes para tu empresa.
          </p>
        </div>
      </div>

      {/* Search Bar (Future feature) */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
        <div className="bg-green-50 p-3 rounded-xl text-green-600">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Buscar por nombre, habilidades o descripción..."
          className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-700 placeholder:text-gray-300"
          disabled // Deshabilitado por ahora hasta tener endpoint de búsqueda
        />
        <button className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:bg-green-700 active:scale-95 opacity-50 cursor-not-allowed">
          Buscar
        </button>
      </div>

      {/* Student List */}
      <StudentList />
    </div>
  );
}
