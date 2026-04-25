"use client"

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { JobOfferForm } from "@/features/restricted/employer/jobOffer/components/form/JobOfferForm";
import { useJobOffer } from "@/features/restricted/employer/jobOffer/hooks/useJobOffer";
import { updateJobOffer } from "@/features/restricted/employer/jobOffer/service/jobOffer.service";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { motion } from "framer-motion";

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


      <main className="relative z-10 py-12 px-4 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
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
