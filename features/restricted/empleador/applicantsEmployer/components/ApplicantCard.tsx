"use client";

import { useRouter } from "next/navigation";
import { Phone, Mail, Calendar, UserCircle } from "lucide-react";
import { ApplicantDTO } from "../types/applicants.types";

interface Props {
  applicant: ApplicantDTO;
}

export const ApplicantCard = ({ applicant }: Props) => {
  const { student, applicationDate } = applicant;
  const router = useRouter();

  const formattedDate = applicationDate
    ? new Intl.DateTimeFormat("es-ES", { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(applicationDate))
    : "Fecha desconocida";

  const handleViewProfile = () => {
    sessionStorage.setItem("employer_student_view", JSON.stringify({ student, applicationDate }));
    router.push(`/empleador/applicants/student`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group w-full">

      {/* Indicator line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
            {student.name || "Sin nombre"}
          </h3>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-1 bg-gray-50 w-fit px-2.5 py-1 rounded-lg">
            <Calendar size={12} className="text-gray-400" />
            Postulado el {formattedDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-green-600" />
            </div>
            <span className="truncate max-w-50 text-sm" title={student.email}>{student.email || "No provisto"}</span>
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
            {student.studentSkills.map((skill) => (
              <span
                key={skill.id}
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
