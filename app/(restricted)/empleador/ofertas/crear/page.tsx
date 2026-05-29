"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobOfferForm } from "@/features/restricted/empleador/jobOffer/components/form/JobOfferForm";
import { createJobOffer } from "@/features/restricted/empleador/jobOffer/service/jobOffer.service";
import { useSubscriptionStatus } from "@/features/suscripcion/hooks/useSubscriptionStatus";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CreateJobOfferPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { status: subStatus, loading: subLoading } = useSubscriptionStatus();
  const isPremium = subStatus?.status === "ACTIVE" && !!subStatus?.currentSubscription;

  if (subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm animate-pulse">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await createJobOffer(data);
      router.push("/empleador/ofertas");
    } catch (error: any) {
      console.error("Error al crear oferta:", error);
      toast.error("Error al crear la oferta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-visible ${!isPremium ? 'bg-slate-50' : ''}`}>
      {/* --- RENDERED BACKGROUND LAYER (Optimized for performance) --- */}
      {isPremium && (
        <div className="fixed inset-0 pointer-events-none bg-slate-50">
           {/* Huge colorful orbs using fast radial gradients instead of expensive CSS blurs */}
           <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, rgba(74,222,128,0) 70%)' }} />
           <div className="absolute top-[10%] right-[-20%] w-[70vw] h-[70vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0) 70%)' }} />
           <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(110,231,183,0.15) 0%, rgba(110,231,183,0) 70%)' }} />
        </div>
      )}

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

          <JobOfferForm
            onSubmit={handleCreate}
            saving={loading}
            isPremium={isPremium}
          />
        </motion.div>
      </main>
    </div>
  );
}
