"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, Check, Copy, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ApplicantStudent } from "../../types/applicants.types";

interface Props {
  student: ApplicantStudent;
  applicationDate?: string;
}

export const StudentHeaderCard = ({ student, applicationDate }: Props) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    if (!student.email) return;
    navigator.clipboard.writeText(student.email);
    setCopiedEmail(true);
    toast.success("Correo copiado al portapapeles");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (!student.contactNumber) return;
    navigator.clipboard.writeText(student.contactNumber);
    setCopiedPhone(true);
    toast.success("Teléfono copiado al portapapeles");
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const inicial = student.name?.charAt(0)?.toUpperCase() || "?";
  const formattedDate = formatDate(applicationDate);

  // Limpiar el número de teléfono para el enlace de WhatsApp (quitar espacios, guiones, etc.)
  const cleanPhone = student.contactNumber?.replace(/[^0-9+]/g, "") || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100/80 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Decorative top bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-green-400 to-blue-500" />

      {/* Avatar Container */}
      <div className="relative group mt-4">
        <div className="h-32 w-32 overflow-hidden rounded-full bg-linear-to-br from-green-500 to-blue-600 border-4 border-white flex items-center justify-center text-white text-[56px] font-black shadow-lg ring-4 ring-gray-50 group-hover:scale-105 transition-all duration-300">
          {student.imgUrl ? (
            <img src={student.imgUrl} alt={student.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            inicial
          )}
        </div>

        {/* Verification Status Badge */}
        {student.verificationStatus && (
          <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 text-green-600 flex items-center justify-center ring-2 ring-white" title="Perfil Verificado">
            <ShieldCheck className="h-5 w-5 fill-green-50 text-green-600" />
          </div>
        )}
      </div>

      {/* Name and Role */}
      <h1 className="text-xl font-extrabold text-gray-900 mt-5 tracking-tight px-2 break-words max-w-full">
        {student.name || <span className="text-gray-400 italic font-medium">Sin nombre</span>}
      </h1>

      {/* Application Date Banner */}
      {formattedDate && (
        <div className="mt-5 w-full bg-blue-50/40 border border-blue-100/50 rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-semibold text-blue-700">
          <Calendar size={14} className="text-blue-500" />
          <span>Postulado el: {formattedDate}</span>
        </div>
      )}

      <hr className="w-full border-gray-100 my-6" />

      {/* Contact Section */}
      <div className="w-full flex flex-col gap-4 text-left">
        <p className="text-sm font-bold text-gray-400">Información de contacto</p>


        {/* Phone */}
        <div className="flex flex-col gap-1 w-full group">
          <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
            {student.contactNumber && (
              <button 
                onClick={handleCopyPhone}
                className="text-gray-400 hover:text-green-600 flex items-center gap-1 transition-colors py-0.5 cursor-pointer"
              >
                {copiedPhone ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                <span>{copiedPhone ? "Copiado" : "Copiar"}</span>
              </button>
            )}
          </div>
          
          {student.contactNumber ? (
            <div className="flex flex-col gap-2">
              <a 
                href={`tel:${student.contactNumber}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 hover:text-blue-700 hover:bg-blue-50/30 hover:border-blue-100/60 transition-all duration-200 text-sm font-semibold"
              >
                <Phone size={16} className="text-blue-500 shrink-0" />
                <span className="flex-1">{student.contactNumber}</span>
                <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

            </div>
          ) : (
            <div className="p-3 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-center text-xs text-gray-400 font-medium italic">
              Número de teléfono no provisto
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
