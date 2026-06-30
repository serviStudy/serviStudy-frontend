"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Phone, MapPin, AlignLeft, CheckCircle2, ArrowLeft, ThumbsUp, Loader2 } from "lucide-react";
import { ActiveOffer } from "@/features/restricted/estudiante/ofertasActivas/types/ofertasActivas.types";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import Image from "next/image";
import { getAuthHeaders } from "@/lib/api/authHeaders";
import { EmployerProfileResponse } from "@/features/restricted/empleador/perfil/services/profileService";
import { giveLike, removeLike, checkIfLiked } from "@/features/restricted/interactions/services/interactionService";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const EmployerProfileView = () => {
  const router = useRouter();
  const [offerData, setOfferData] = useState<ActiveOffer | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    // 1. Recuperar los datos del sessionStorage
    const raw = sessionStorage.getItem("student_employer_view");
    if (!raw) {
      router.back();
      return;
    }

    try {
      const parsedOffer: ActiveOffer = JSON.parse(raw);
      setOfferData(parsedOffer);

      // 2. Hacer fetch del perfil del empleador usando el employerId presente en la oferta
      const fetchEmployerProfile = async () => {
        setLoading(true);
        try {
          const employerId = parsedOffer.employerId || (parsedOffer as any).employer_id || parsedOffer.id;
          if (employerId) {
            const res = await fetch(`/api/proxy/profiles/employer/${employerId}`, {
              headers: getAuthHeaders(),
            });
            if (res.ok) {
              const data = await res.json();
              const profile = data.data ?? data;
              setEmployerProfile(profile);

              const profileId = profile.id || profile.employerId || profile.employer_id;
              if (profileId) {
                const isLiked = await checkIfLiked(profileId, "STUDENT");
                setLiked(isLiked);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching employer profile", error);
        } finally {
          setLoading(false);
        }
      };
      fetchEmployerProfile();
    } catch {
      router.back();
    }
  }, [router]);

  if (!offerData) return null;

  const inicial = offerData.businessName ? offerData.businessName.charAt(0).toUpperCase() : "E";

  // Mezclar datos de la oferta con los del perfil real del empleador
  const displayImage = employerProfile?.imageUrl || employerProfile?.image_url || offerData.imageUrl;
  const displayName = employerProfile?.businessName || employerProfile?.business_name || offerData.businessName;
  const displayAddress = employerProfile?.businessAddress || employerProfile?.business_address || offerData.establishmentAddress;
  const displayContactNumber = employerProfile?.contactNumber || employerProfile?.contact_number;
  const displaySummary = employerProfile?.businessSummary || employerProfile?.business_summary;
  const isVerified = employerProfile?.verificationStatus || employerProfile?.verification_status || false;

  return (
    <div className="flex flex-col min-h-screen w-full pb-16 bg-gray-50/50">
      {/* Back button */}
      <div className="pt-6 px-4 max-w-6xl mx-auto w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1a4b9e] font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col items-center mt-4 px-4"
      >
        <div className="w-full max-w-6xl flex flex-col gap-8">

          {/* 1. Hero Section (Banner & Identity) */}
          <motion.div variants={itemVariants} className="relative w-full rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100">
            {/* Background Banner - Green Gradient */}
            <div className="h-50 lg:h-60 w-full bg-linear-to-br from-green-900 via-green-700 to-green-500 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Identity Section */}
            <div className="px-5 sm:px-10 lg:px-16 pb-12">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-center lg:items-end -mt-16 lg:-mt-20">
                {/* Logo */}
                <div className="relative shrink-0">
                  <div className="h-32 w-32 sm:h-40 sm:w-40 lg:h-40 lg:w-40 rounded-lg bg-white p-5 sm:p-6 shadow-md border border-gray-100 flex items-center justify-center overflow-hidden z-10">
                    {displayImage ? (
                      <Image width={150} height={150} src={displayImage} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[60px] sm:text-[80px] lg:text-[100px] font-black text-green-700/10">
                        {inicial}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-2.5 rounded-md shadow-sm border-4 border-white z-20">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center lg:text-left lg:pb-2 min-w-0 z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 mb-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-900 tracking-tight truncate capitalize">
                      {displayName || "Nombre de Empresa"}
                    </h1>
                    {isVerified && (
                      <span className="w-fit mx-auto lg:mx-0 px-3 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-medium uppercase tracking-wider border border-green-100">
                        Empresa Verificada
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <p className="text-sm lg:text-base font-normal text-gray-500 capitalize">
                      {employerProfile?.employerName || employerProfile?.employer_name || "Empleador"}
                    </p>

                    {/* Like Button */}
                    {(employerProfile?.id || employerProfile?.employerId || employerProfile?.employer_id) && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={async () => {
                          if (likeLoading) return;
                          setLikeLoading(true);
                          try {
                            const profileId = employerProfile.id || employerProfile.employerId || employerProfile.employer_id;
                            if (profileId) {
                              if (liked) {
                                await removeLike(profileId);
                                setLiked(false);
                              } else {
                                await giveLike(profileId);
                                setLiked(true);
                              }
                            }
                          } catch (err) {
                            console.error("Error toggling like:", err);
                          } finally {
                            setLikeLoading(false);
                          }
                        }}
                        disabled={likeLoading}
                        className={`flex items-center gap-2 px-4 py-1 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm ${liked
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                          } disabled:opacity-50`}
                        title={liked ? "Quitar Like" : "Dar Like"}
                      >
                        {likeLoading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ThumbsUp size={16} className={liked ? "fill-white" : ""} />
                        )}
                        {liked ? "Like dado" : "Dar Like"}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="py-12 flex justify-center"><LoadingScreen /></div>
          ) : (
            <motion.div variants={itemVariants} className="flex flex-col gap-8 pb-10">
              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 capitalize">
                {[
                  { label: "Teléfono", value: displayContactNumber || "No disponible", icon: Phone, color: "text-green-600 bg-green-50" },
                  { label: "Dirección", value: displayAddress || "No disponible", icon: MapPin, color: "text-green-600 bg-green-50" },
                ].map((item) => (
                  <div key={item.label} className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center md:flex-col md:items-start gap-4 md:gap-0">
                    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center md:mb-4 shrink-0`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 wrap-break-word">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* About Section */}
              <section className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                    <AlignLeft size={24} />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">Sobre nosotros</h3>
                </div>

                <p className="text-base text-gray-600 leading-relaxed font-medium capitalize">
                  {displaySummary || "Esta empresa aún no ha añadido una descripción sobre su visión y valores."}
                </p>
              </section>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
