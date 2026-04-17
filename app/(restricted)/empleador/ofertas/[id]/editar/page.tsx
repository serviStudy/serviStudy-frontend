"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { JobOfferForm } from "@/features/restricted/employer/jobOffer/components/form/JobOfferForm";
import { CreateJobOfferDTO, JobOfferDTO } from "@/features/restricted/employer/jobOffer/types/jobOffer.types";
import { getEmployerOfferById, updateJobOffer, addRequirementToOffer, removeRequirementFromOffer } from "@/features/restricted/employer/jobOffer/service/jobOffer.service";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditOfferPage() {
  const router = useRouter();
  const params = useParams();
  const offerId = params.id as string;

  const [initialData, setInitialData] = useState<Partial<CreateJobOfferDTO> | null>(null);
  const [completeOfferData, setCompleteOfferData] = useState<JobOfferDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const offer = await getEmployerOfferById(offerId);
        if (offer) {
          setCompleteOfferData(offer);
          setInitialData({
            title: offer.title,
            establishmentAddress: offer.establishmentAddress || offer.establishment_address,
            workDays: offer.workDays || offer.work_days || [],
            workSchedule: offer.workSchedule || offer.work_schedule || "FULL_TIME",
            salary: offer.salary,
            salaryDescription: offer.salaryDescription || offer.salary_description || "",
            contractDescription: offer.contractDescription || offer.contract_description || (offer as any).contract_type || (offer as any).contractType || "",
            description: offer.description,
            requirements: offer.requirements.map((r: any) => r.requirementName || r.name),
          });
        } else {
          toast.error("Oferta no encontrada");
          router.push("/empleador/ofertas");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar la oferta");
      } finally {
        setLoading(false);
      }
    };
    if (offerId) fetchOffer();
  }, [offerId, router]);

  const handleSubmit = async (data: CreateJobOfferDTO) => {
    try {
      await updateJobOffer(offerId, data);
      
      toast.success("¡Oferta actualizada exitosamente!");
      router.push(`/empleador/ofertas/${offerId}`);
    } catch (err) {
      toast.error("Hubo un error al actualizar la oferta.");
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingScreen background="bg-gray-50" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-6">
        <Link href={`/empleador/ofertas/${offerId}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="mr-2" size={20} />
          Volver a Detalles
        </Link>
      </div>
      {initialData && (
        <JobOfferForm initialData={initialData} isEditing onSubmit={handleSubmit} />
      )}
    </div>
  );
}
