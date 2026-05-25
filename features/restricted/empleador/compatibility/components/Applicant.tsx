"use client";

import { useRouter } from "next/navigation";
import { Phone, Mail, Calendar, UserCircle, Sparkles } from "lucide-react";
import { ApplicantDTO } from "../../applicantsEmployer/types/applicants.types";
import { Checkbox } from "@/components/ui/checkbox"
import { div } from "framer-motion/client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";


interface Props {
  applicant: ApplicantDTO;
  isSelected: boolean;
  onSelect: (id: string) => void;
  resultsIA: any
}

const AnimatedMatchTag = ({ score }: { score: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (score === undefined || score === null) return;
    
    // Animate text progress
    const duration = 1500; // 1.5 seconds
    const fps = 60;
    const steps = duration / (1000 / fps);
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setProgress(score);
        clearInterval(timer);
      } else {
        setProgress(Math.round(current));
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [score]);

  const r = 16;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="absolute top-0 right-0 flex items-center gap-3 pl-2 pr-4 py-2 bg-linear-to-r from-emerald-500 to-blue-500 text-white rounded-bl-2xl rounded-tr-xl shadow-md animate-in slide-in-from-top-4 duration-500 z-10">
      {/* Circular Progress */}
      <div className="relative flex items-center justify-center w-10 h-10">
        <svg className="transform -rotate-90 w-10 h-10">
          <circle
            cx="20"
            cy="20"
            r={r}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r={r}
            stroke="white"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[11px] font-bold tracking-tighter">{progress}%</span>
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Sparkles size={11} className="text-yellow-300 animate-pulse" />
          <span className="text-[10px] uppercase font-black tracking-widest text-white/90">
            IA Match
          </span>
        </div>
        <span className="text-[14px] font-extrabold leading-none">
          Compatible
        </span>
      </div>
    </div>
  );
};

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
        <AnimatedMatchTag score={resultsIA} />
      )}

      <Checkbox
        id={`checkbox-${applicant.applicantId}`}
        checked={isSelected}
        onCheckedChange={() => {
          console.log(`[Applicant] Toggling studentProfileId: ${applicant.student.studentProfileId}`);
          onSelect(applicant.student.studentProfileId);
        }}
        className="border-2 ml-6 border-green-500 rounded-[2px] h-4.5 w-4.5 cursor-pointer"
      />

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Left Section (Avatar, Info, and bottom content) */}
        <div className="flex-1 flex flex-col gap-4">
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Avatar */}
            <div className="shrink-0 pl-4 flex items-center justify-center md:items-start">
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
                    <Phone size={14} className="text-blue-500" />
                  </div>
                  <span className="text-sm">{student.contactNumber || "Sin teléfono"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: Description and Skills spanning width of the left section */}
          <div className="w-full flex flex-col gap-3 pl-4 md:pl-0 mt-2">
            {student.description && (
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <p className="text-sm w-full text-gray-600 line-clamp-3 italic leading-relaxed">
                  "{student.description}"
                </p>
              </div>
            )}

            {student.studentSkills && student.studentSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Right Section: Actions */}
        <div className="shrink-0 flex flex-col justify-center items-end mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
          <button
            onClick={handleViewProfile}
            className="w-full md:w-auto mx-3 px-6 py-2.5 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95 text-center tracking-wider cursor-pointer"
          >
            Ver perfil
          </button>
        </div>
      </div>

    </div>
  );
};
