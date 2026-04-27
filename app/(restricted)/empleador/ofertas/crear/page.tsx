"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobOfferForm } from "@/features/restricted/employer/jobOffer/components/form/JobOfferForm";
import { createJobOffer } from "@/features/restricted/employer/jobOffer/service/jobOffer.service";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateJobOfferPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await createJobOffer(data);
      // Success is handled by redirect
      router.push("/empleador/ofertas");
    } catch (error: any) {
      console.error("Error al crear oferta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* --- PREMIUM BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-green-50/40 rounded-full blur-[140px]"
         />
         <div className="absolute inset-0 bg-dot-pattern opacity-[0.3]" />
      </div>


      <main className="relative z-10 py-8 px-4 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

          <JobOfferForm onSubmit={handleCreate} saving={loading} />
        </motion.div>
      </main>
    </div>
  );
}
