"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ApplicantStudent } from "@/features/restricted/empleador/applicantsEmployer/types/applicants.types";
import { ProfileBanner } from "@/features/restricted/empleador/applicantsEmployer/components/studentProfile/ProfileBanner";
import { StudentHeaderCard } from "@/features/restricted/empleador/applicantsEmployer/components/studentProfile/StudentHeaderCard";
import { AboutMeCard } from "@/features/restricted/empleador/applicantsEmployer/components/studentProfile/AboutMeCard";
import { SkillsCard } from "@/features/restricted/empleador/applicantsEmployer/components/studentProfile/SkillsCard";
import { AvailabilityCard } from "@/features/restricted/empleador/applicantsEmployer/components/studentProfile/AvailabilityCard";

interface StoredData {
  student: ApplicantStudent;
  applicationDate: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function StudentProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<StoredData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("employer_student_view");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing employer_student_view:", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50/50">
        <Loader2 className="animate-spin h-10 w-10 text-green-600 mb-2" />
        <span className="text-sm font-semibold text-gray-500">Cargando perfil...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50/50 gap-4">
        <p className="text-gray-500 font-bold text-lg">No se encontró información del perfil.</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 font-bold px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
        >
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>
    );
  }

  const { student, applicationDate } = data;

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50/20 pb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col items-center"
      >
        {/* Banner Section */}
        <ProfileBanner />

        {/* Layout Grid (Left column: avatar & contact, Right column: info sections) */}
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6 md:gap-8 -mt-12 md:-mt-16 relative z-10">
          
          {/* Left Side Column */}
          <div className="w-full md:w-80 shrink-0">
            <StudentHeaderCard student={student} applicationDate={applicationDate} />
          </div>

          {/* Right Side Column */}
          <div className="w-full flex-1 flex flex-col gap-6 md:gap-8">
            <motion.div variants={itemVariants}>
              <AboutMeCard description={student.description} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SkillsCard skills={student.studentSkills} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AvailabilityCard workSchedule={student.workSchedule} workDays={student.workDays} />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}