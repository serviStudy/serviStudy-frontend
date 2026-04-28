import { JobOfferDTO } from "@/features/restricted/empleador/jobOffer/types/jobOffer.types";
import { getAuthHeaders } from "@/lib/api/authHeaders";

export const getEmployerOfferById = async (
    id: string
    ): Promise<JobOfferDTO | undefined> => {
    const res = await fetch(`/api/offers/${id}`, {
        headers: getAuthHeaders(),
        cache: "no-store",
    });

    if (res.status === 404) return undefined;

    const resData = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(
        resData?.message || "Error al obtener la oferta"
        );
    }

    const normalizedOffer = parseOfferHack(
        resData?.data ?? resData
    ) as JobOfferDTO;

    return {
        ...normalizedOffer,
        id: normalizedOffer.id ?? normalizedOffer.jobOfferId ?? id,
        jobOfferId:
        normalizedOffer.jobOfferId ??
        normalizedOffer.id ??
        id,
    };
};

function parseOfferHack(arg0: any): JobOfferDTO {
    throw new Error("Function not implemented.");
}
