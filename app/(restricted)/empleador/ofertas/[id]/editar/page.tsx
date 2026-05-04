"use client"

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { JobOfferForm } from "@/features/restricted/empleador/jobOffer/components/form/JobOfferForm";
import { useJobOffer } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffer";
import { updateJobOffer } from "@/features/restricted/empleador/jobOffer/service/jobOffer.service";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditJobOfferPage() {
  const router = useRouter();
  const { id } = useParams();
  const { offer, loading } = useJobOffer(id as string);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (data: any) => {
    setSaving(true);
    try {
      await updateJobOffer(id as string, data);
      router.push("/empleador/ofertas");
    } catch (error) {
      console.error("Error al actualizar oferta:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ 
              x: [0, -100, 0], 
              y: [0, 60, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-green-50/40 rounded-full blur-[140px]"
         />
         <div className="absolute inset-0 bg-dot-pattern opacity-[0.3]" />
      </div>


      <main className="relative z-10 py-12 px-4 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl"
        >
          {/* Back Link */}
          <Link
            href="/empleador/ofertas"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-green-600 font-black text-sm uppercase tracking-widest mb-10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-green-50 group-hover:border-green-100 transition-all">
              <ArrowLeft size={18} />
            </div>
            Volver a Ofertas
          </Link>

          <JobOfferForm 
            initialData={offer ? {
              ...offer,
              requirements: offer.requirements?.map(req => req.name || req.requirementName || "") || []
            } : {}} 
            isEditing 
            onSubmit={handleUpdate} 
            saving={saving} 
          />
        </motion.div>
      </main>
    </div>
  );
}
