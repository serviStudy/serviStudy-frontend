"use client";

import { MapPin, Phone, Mail, Calendar, UserCircle } from "lucide-react";
import { ApplicantDTO } from "../types/applicants.types";
import Link from "next/link";

interface Props {
  applicant: ApplicantDTO;
}

export const ApplicantCard = ({ applicant }: Props) => {
  const { student, applicationDate } = applicant;
  
  // Format date safely using native Intl.DateTimeFormat
  const formattedDate = applicationDate 
    ? new Intl.DateTimeFormat("es-ES", { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(applicationDate))
    : "Fecha desconocida";

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden group w-full">
      
      {/* Indicator line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1a4b9e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Left: Avatar */}
      <div className="shrink-0 flex items-center justify-center md:justify-start">
        {student.imgUrl ? (
          <img 
            src={student.imgUrl} 
            alt={student.name || "Estudiante"} 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center border-4 border-gray-50 shadow-sm text-[#1a4b9e] transition-transform group-hover:scale-105">
            <UserCircle size={48} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Center: Info */}
      <div className="flex-1 flex flex-col gap-3 justify-center min-w-0">
        <div>
          <h3 className="text-xl font-black text-gray-900 truncate group-hover:text-[#1a4b9e] transition-colors">
            {student.name || "Sin nombre"}
          </h3>
          <p className="text-sm text-gray-500 font-bold flex items-center gap-1.5 mt-1 bg-gray-50 w-fit px-2.5 py-1 rounded-md">
            <Calendar size={14} className="text-gray-400" />
            Postulado el {formattedDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-gray-700 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-[#1a4b9e]" />
            </div>
            <span className="truncate max-w-[200px]" title={student.email}>{student.email || "No provisto"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Phone size={14} className="text-[#28a745]" />
            </div>
            <span>{student.contactNumber || "Sin teléfono"}</span>
          </div>
        </div>

        {student.description && (
          <p className="text-[13px] text-gray-600 line-clamp-2 mt-1 bg-gray-50/50 p-3 rounded-xl border border-gray-100 italic leading-relaxed">
            "{student.description}"
          </p>
        )}

        {/* Skills */}
        {student.studentSkills && student.studentSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {student.studentSkills.map((skill) => (
              <span 
                key={skill.id} 
                className="px-3 py-1 bg-blue-50/50 text-[#1a4b9e] text-xs font-bold rounded-full border border-blue-100/50 shadow-sm"
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="shrink-0 flex flex-col justify-center items-end mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
        <button 
          onClick={() => alert("Funcionalidad 'Ver perfil' en desarrollo")}
          className="w-full md:w-auto px-8 py-3 bg-[#1a4b9e] hover:bg-[#123675] text-white text-sm font-black rounded-full shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 active:scale-95 text-center uppercase tracking-wider"
        >
          Ver perfil
        </button>
      </div>

    </div>
  );
};
