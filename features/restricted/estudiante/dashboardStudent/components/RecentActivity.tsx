"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";
import { ChevronRight } from 'lucide-react';
import { ApplicationItem } from '@/features/restricted/estudiante/misPostulaciones/types/applicationTypes';

interface RecentActivityProps {
  itemVariants: any;
  loadingPosts: boolean;
  recentApplications: ApplicationItem[];
}

export const RecentActivity = ({ itemVariants, loadingPosts, recentApplications }: RecentActivityProps) => {
  const getRelativeTime = (dateStr: string) => {
    const today = new Date();
    const pastDate = new Date(dateStr);
    today.setHours(0, 0, 0, 0);
    pastDate.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - pastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "hoy";
    if (diffDays === 1) return "hace 1 día";
    return `hace ${diffDays} días`;
  };

  return (
    <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-slate-800">Actividad Reciente</h2>
        <Link href="/estudiante/misPostulaciones" className="text-emerald-600 text-sm font-bold uppercase tracking-wide hover:text-emerald-700">
          VER TODO
        </Link>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-4">
        {loadingPosts ? (
          <div className="text-center text-slate-500 py-4">Cargando actividad...</div>
        ) : recentApplications.length > 0 ? (
          recentApplications.map((app, index) => (
            <Link href={app.jobOffer?.jobOfferId ? `/estudiante/postulacion/${app.jobOffer.jobOfferId}` : '/estudiante/misPostulaciones'} key={app.applicantId || index}>
              <div className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-slate-100">
                <div className="flex items-center gap-4">

                  {app.jobOffer?.imageUrl ? (
                    <div className='w-16 h-16 md:w-14 md:h-14 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 p-2'>
                      <Image
                        width={80}
                        height={80}
                        src={app.jobOffer.imageUrl || "/placeholder-job.png"}
                        alt={app.jobOffer.title || "Oferta de trabajo"}
                        className='object-contain w-full h-full'
                      />
                    </div>
                  ) : (
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center font-bold text-emerald-600 text-lg uppercase">
                        {app.jobOffer?.title?.charAt(0) || "P"}
                      </div>
                  )
                  }

                  <div className="flex flex-col">
                    <span className="text-slate-800 font-semibold text-[15px]">
                      Postulación enviada: <span className="text-emerald-600">{app.jobOffer?.title || "Oferta no disponible"}</span>
                    </span>
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                      {getRelativeTime(app.applicationDate)}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-slate-500 py-4">No hay actividad reciente</div>
        )}
      </div>
    </motion.div>
  );
};
