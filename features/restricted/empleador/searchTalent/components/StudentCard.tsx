"use client";

import { useRouter } from "next/navigation";
import { Phone, Mail, UserCircle, CheckCircle2, Sparkles } from "lucide-react";
import { StudentProfile } from "../types/searchTalent.types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  student: StudentProfile;
}

export const StudentCard = ({ student }: Props) => {
  const router = useRouter();

  const handleViewProfile = () => {
    // Reutilizamos el mecanismo de sessionStorage que ya usa la app para ver perfiles de estudiantes
    // Nota: applicationDate se deja vacío ya que no es una postulación específica
    sessionStorage.setItem("employer_student_view", JSON.stringify({ student, applicationDate: "" }));
    router.push("/empleador/applicants/student");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group w-full">

      {/* Compatibility Badge - Top Right Premium Widget */}
      {student.compatibilityScore !== undefined && (() => {
        const score = Math.round((student.compatibilityScore <= 1 ? student.compatibilityScore * 100 : student.compatibilityScore));
        
        // Circular progress parameters
        const radius = 18;
        const circumference = 2 * Math.PI * radius; // ~113.1
        
        return (
          <div className="absolute top-0 right-0 z-10 select-none">
            <div className="bg-linear-to-r from-green-500 to-blue-500 text-white rounded-bl-2xl px-4 py-2.5 flex items-center gap-3.5 shadow-md shadow-green-500/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/20 group-hover:scale-[1.02]">
              
              {/* Circular Gauge */}
              <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                <svg className="w-11 h-11 transform -rotate-90">
                  {/* Background Track circle */}
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  {/* Glowing shadow circle */}
                  <motion.circle
                    cx="22"
                    cy="22"
                    r={radius}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                    className="blur-[1px] opacity-35"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  {/* Main Progress Circle using White */}
                  <motion.circle
                    cx="22"
                    cy="22"
                    r={radius}
                    stroke="white"
                    strokeWidth="3"
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[12px] font-black text-white tracking-tighter leading-none mt-0.5">
                    {score}
                  </span>
                  <span className="text-[8px] font-bold text-white/90 uppercase tracking-tighter leading-none ml-0.5">
                    %
                  </span>
                </div>
              </div>

              {/* Text info and Sparkles */}
              <div className="flex flex-col gap-0.5 pr-0.5 text-left">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-yellow-300 fill-yellow-300 animate-pulse shrink-0" />
                  <span className="text-[9px] font-black tracking-widest text-white/80 uppercase leading-none">
                    IA Match
                  </span>
                </div>
                <span className="text-[12px] font-extrabold text-white leading-tight">
                  {score}% Compatible
                </span>
              </div>
              
            </div>
          </div>
        );
      })()}

      {/* Indicator line */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300",
        student.compatibilityScore !== undefined ? "bg-linear-to-b from-green-500 to-blue-500" : "bg-green-600 opacity-0 group-hover:opacity-100"
      )} />

      {/* Left: Avatar */}
      <div className="shrink-0 flex items-center justify-center md:justify-start">
        {student.imgUrl ? (
          <img
            src={student.imgUrl}
            alt={student.name || "Estudiante"}
            className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 shadow-sm transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-green-50 flex items-center justify-center border-2 border-gray-100 shadow-sm text-green-600 transition-transform group-hover:scale-105">
            <UserCircle size={40} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Center: Info */}
      <div className="flex-1 flex flex-col gap-2.5 justify-center min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
            {student.name || "Sin nombre"}
          </h3>
          {student.verificationStatus && (
            <div className="bg-green-50 text-green-600 p-0.5 rounded-full" title="Perfil verificado">
              <CheckCircle2 size={14} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-green-600" />
            </div>
            <span className="truncate max-w-[200px] text-sm" title={student.email}>{student.email || "No provisto"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <Phone size={14} className="text-green-600" />
            </div>
            <span className="text-sm">{student.contactNumber || "Sin teléfono"}</span>
          </div>
        </div>

        {student.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-1 bg-gray-50 p-3 rounded-xl border border-gray-100 italic leading-relaxed">
            "{student.description}"
          </p>
        )}

        {student.studentSkills && student.studentSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {student.studentSkills.map((skill, index) => (
              <span
                key={skill.id || `skill-${index}`}
                className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-100"
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Action */}
      <div className="shrink-0 flex flex-col justify-center items-end mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
        <button
          onClick={handleViewProfile}
          className="w-full md:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95 text-center uppercase tracking-wider cursor-pointer"
        >
          Ver perfil
        </button>
      </div>
    </div>
  );
};
