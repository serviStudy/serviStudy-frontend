"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const ProfileBanner = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="group mb-4 flex items-center gap-2 text-gray-500 hover:text-green-600 font-bold px-4 py-2.5 rounded-xl hover:bg-green-50/50 border border-gray-100 shadow-xs hover:shadow-sm active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300 text-gray-400 group-hover:text-green-600" />
        Volver a postulantes
      </motion.button>

      {/* Cover Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-44 md:h-56 rounded-3xl bg-linear-to-r from-green-500 via-emerald-600 to-blue-900 relative overflow-hidden shadow-md"
      >
        {/* Modern grid & blur elements for premium texture */}
        <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]" />
        
        {/* Glow circles */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-green-300/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-30%] right-[-10%] w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px]" />
      </motion.div>
    </div>
  );
};
