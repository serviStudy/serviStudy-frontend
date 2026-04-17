"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JobOfferForm } from "@/features/restricted/employer/jobOffer/components/form/JobOfferForm";
import { CreateJobOfferDTO } from "@/features/restricted/employer/jobOffer/types/jobOffer.types";
import { createJobOffer } from "@/features/restricted/employer/jobOffer/service/jobOffer.service";
import { getEmployerProfile } from "@/features/profile/employer/services/profileService";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateOfferPage() {
  const router = useRouter();
  const [employerId, setEmployerId] = useState<string | null>(null);

  // Utilidad para decodificar JWT en el cliente
  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        let foundId = null;

        if (token) {
          const decoded = decodeJWT(token);
          foundId = decoded?.id || decoded?.sub;
        }

        const fullProfile = await getEmployerProfile();
        // El ID también podría estar en el perfil, lo usamos de respaldo
        const pData = (fullProfile as any)?.data || fullProfile;
        const profileId = fullProfile?.employerId || 
                          fullProfile?.id || 
                          pData?.employerId || 
                          pData?.id;

        if (profileId) foundId = profileId;
        
        if (foundId) {
          setEmployerId(foundId);
        }
      } catch (err) {
        console.error("Error al cargar perfil de empleador:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (data: CreateJobOfferDTO) => {
    if (!employerId) {
      toast.error("No se pudo identificar tu cuenta de empleador. Por favor, recarga la página.");
      return;
    }

    try {
      await createJobOffer({
        ...data,
        employerId: employerId
      });
      toast.success("¡Oferta publicada exitosamente!");
      router.push("/empleador/ofertas");
    } catch (err) {
      toast.error("Hubo un error al publicar la oferta.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-6">
        <Link href="/empleador/ofertas" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="mr-2" size={20} />
          Volver a Mis Ofertas
        </Link>
      </div>
      <JobOfferForm onSubmit={handleSubmit} />
    </div>
  );
}
