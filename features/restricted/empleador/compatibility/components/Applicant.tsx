"use client";

import { useRouter } from "next/navigation";
import { Phone, Mail, Calendar, UserCircle, Sparkles } from "lucide-react";
import { ApplicantDTO } from "../../applicantsEmployer/types/applicants.types";
import { Checkbox } from "@/components/ui/checkbox"
import { div } from "framer-motion/client";
import { Button } from "@/components/ui/button";


interface Props {
  applicant: ApplicantDTO;
  isSelected: boolean;
  onSelect: (id: string) => void;
  resultsIA: any
}

export const Applicant = ({ applicant, isSelected, onSelect, resultsIA }: Props) => {
  const { student, applicationDate } = applicant;
  const router = useRouter();

  const formattedDate = applicationDate
    ? new Intl.DateTimeFormat("es-ES", { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(applicationDate))
    : "Fecha desconocida";

  const handleViewProfile = () => {
    sessionStorage.setItem("employer_student_view", JSON.stringify({ student, applicationDate }));
    router.push("/empleador/applicants/student");
  };

  console.log(`[Applicant] Rendering ${applicant.student.name}:`, {
    applicantId: applicant.applicantId,
    isSelected
  });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-blue-100/50 p-6 flex flex-col md:flex-row gap-6 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300/50 transition-all duration-300 relative overflow-hidden group w-full">

      {/* Indicator line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-green-400 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* AI Result Tag - Top Right Corner */}
      {resultsIA !== undefined && (
        <div className="absolute top-0 right-0 flex items-center gap-1.5 px-4 py-1.5 bg-linear-to-r  from-green-500 to-blue-500 text-white rounded-bl-xl shadow-md animate-in slide-in-from-top-4 duration-500 z-10">
          <Sparkles size={14} className="text-white animate-pulse" />
          <span className="text-[11px] uppercase tracking-wider font-bold">
            {resultsIA}% Compatible
          </span>
        </div>
      )}

      <Checkbox
        id={`checkbox-${applicant.applicantId}`}
        checked={isSelected}
        onCheckedChange={() => {
          console.log(`[Applicant] Toggling studentProfileId: ${applicant.student.studentProfileId}`);
          onSelect(applicant.student.studentProfileId);
        }}
        className="border-2 ml-6 border-green-500 rounded-[2px] h-4.5 w-4.5"
      />

      {/* Left: Avatar */}
      <div className="shrink-0 pl-4 flex items-center justify-center md:items-start ">
        {student.imgUrl ? (
          <img
            src={student.imgUrl}
            alt={student.name || "Estudiante"}
            className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 shadow-sm transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center border-2 border-gray-100 shadow-sm text-blue-500 transition-transform group-hover:scale-105">
            <UserCircle size={40} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Center: Info */}
      <div className="flex-1 flex flex-col gap-2.5 justify-center min-w-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate capitalize group-hover:text-green-600 transition-colors">
            {student.name || "Sin nombre"}
          </h3>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-1 bg-gray-50 w-fit px-2.5 py-1 rounded-lg">
            <Calendar size={12} className="text-gray-400" />
            Postulado el {formattedDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-blue-500" />
            </div>
            <span className="truncate max-w-50 text-sm" title={student.email}>{student.email || "No provisto"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center shrink-0">
              <Phone size={14} className="text-blue-500" />
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
            {student.studentSkills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-linear-to-r from-green-50 to-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100/50"
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        )}
      </div>


      <div className="shrink-0 flex flex-col justify-center items-end mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
        <button
          onClick={handleViewProfile}
          className="w-full md:w-auto px-6 py-2.5 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95 text-center tracking-wider cursor-pointer"
        >
          Ver perfil
        </button>
      </div>
    </div>
  );
};
