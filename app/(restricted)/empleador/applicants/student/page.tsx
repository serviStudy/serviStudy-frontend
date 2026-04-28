"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
    Mail, Phone, CheckCircle2, User, Zap, Calendar, ArrowLeft
} from "lucide-react";
import { ApplicantStudent } from "@/features/restricted/empleador/applicantsEmployer/types/applicants.types";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

interface StoredData {
    student: ApplicantStudent;
    applicationDate: string;
}

export default function StudentProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<StoredData | null>(null);

    useEffect(() => {
        const raw = sessionStorage.getItem("employer_student_view");
        if (!raw) { router.replace("/empleador/selectOffer"); return; }
        try { setData(JSON.parse(raw)); } catch { router.replace("/empleador/selectOffer"); }
    }, [router]);

    if (!data) return null;

    const { student, applicationDate } = data;
    const inicial = student.name?.charAt(0)?.toUpperCase() || "?";
    const formattedDate = applicationDate
        ? new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(applicationDate))
        : "Fecha desconocida";

    return (
        <div className="flex flex-col min-h-screen w-full pb-16">

            {/* Back button */}
            <div className="pt-6 px-4 max-w-6xl mx-auto w-full">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#1a4b9e] font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                >
                    <ArrowLeft size={20} />
                    Volver a postulantes
                </button>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full flex flex-col items-center mt-4"
            >
                {/* Cover Banner */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-6xl mx-auto h-40 md:h-52 rounded-3xl bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] relative overflow-hidden shadow-lg"
                >
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]" />
                </motion.div>

                {/* Two-Column Layout */}
                <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 -mt-20 relative z-10">

                    {/* Left Column */}
                    <div className="w-full md:w-85 flex flex-col gap-6 shrink-0">

                        {/* Avatar & Basic Info */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center">
                            <div className="h-32 w-32 -mt-16 overflow-hidden rounded-full bg-[#2552d0] border-4 border-white flex items-center justify-center text-white text-[56px] font-bold shadow-lg ring-4 ring-blue-50">
                                {student.imgUrl ? (
                                    <img src={student.imgUrl} alt="Perfil" className="h-full w-full object-cover" />
                                ) : (
                                    inicial
                                )}
                            </div>

                            <h1 className="text-2xl font-extrabold text-gray-900 mt-5">
                                {student.name || <span className="text-gray-400 italic font-medium text-lg">Sin nombre</span>}
                            </h1>
                            <h2 className="text-blue-600 font-semibold mt-1">Estudiante</h2>

                            {/* Badge de verificación */}
                            <div className="mt-4">
                                <span className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm ${student.verificationStatus ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    {student.verificationStatus ? "Perfil verificado" : "No verificado"}
                                </span>
                            </div>

                            <hr className="w-full border-gray-100 my-6" />

                            {/* Contacto */}
                            <div className="flex flex-col gap-4 w-full text-left text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Mail className="h-4 w-4" /></div>
                                    <span className="truncate">{student.email || "—"}</span>
                                </div>
                                {student.contactNumber && (
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Phone className="h-4 w-4" /></div>
                                        <span>{student.contactNumber}</span>
                                    </div>
                                )}
                            </div>

                            {/* Fecha de postulación */}
                            <div className="mt-6 w-full flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                                <Calendar className="h-4 w-4 text-[#1a4b9e] shrink-0" />
                                <p className="text-xs text-gray-600 font-medium">
                                    Postulado el <span className="font-bold text-gray-900">{formattedDate}</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full flex-1 flex flex-col gap-6 pt-4 md:pt-0">

                        {/* Sobre mí */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                                    <User className="h-5 w-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Sobre mí</h3>
                            </div>
                            {student.description ? (
                                <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
                                    {student.description}
                                </p>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 text-center">
                                    <p className="text-sm text-gray-400 italic">El estudiante no ha añadido una descripción.</p>
                                </div>
                            )}
                        </motion.div>

                        {/* Habilidades */}
                        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20 text-white">
                                    <Zap className="h-5 w-5" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Cualidades destacadas</h3>
                            </div>
                            {student.studentSkills && student.studentSkills.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {student.studentSkills.map((s) => (
                                        <div key={s.id} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 shadow-sm flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                            {s.skillName}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 text-center">
                                    <p className="text-sm text-gray-400 italic">El estudiante no ha añadido habilidades.</p>
                                </div>
                            )}
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}
