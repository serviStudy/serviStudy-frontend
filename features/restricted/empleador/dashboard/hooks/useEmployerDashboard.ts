"use client";
import { useJobOffers } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffers";
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";
import { useMemo } from "react";

export const useEmployerDashboard = () => {
  const { offers, loading: loadingOffers } = useJobOffers();
  const { profile, loading: loadingProfile, email } = useEmployerProfile();

  const stats = useMemo(() => {
    const activeOffers = offers.filter(o => o.status === "ACTIVE").length;
    
    // Simulación de candidatos basada en el número de ofertas
    // En el futuro, esto debería venir de un endpoint de /applications/count
    const totalCandidates = offers.length > 0 ? (offers.length * 3) + 2 : 0; 

    // Cálculo de completitud de perfil
    const profileFields = [
      profile.businessName || (profile as any).business_name,
      profile.businessAddress || (profile as any).business_address,
      profile.contactNumber || (profile as any).contact_number,
      profile.businessSummary || (profile as any).business_summary,
      profile.imageUrl || (profile as any).image_url
    ];
    const completedFields = profileFields.filter(f => !!f).length;
    const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

    return {
      activeOffers,
      totalCandidates,
      profileCompletion,
      totalOffers: offers.length
    };
  }, [offers, profile]);

  const recentActivity = useMemo(() => {
    // Ordenar por fecha de creación descendente
    return [...offers]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [offers]);

  return {
    stats,
    recentActivity,
    profile,
    email,
    loading: loadingOffers || loadingProfile
  };
};
