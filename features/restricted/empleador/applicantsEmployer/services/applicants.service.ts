import { PaginatedApplicants, ApplicantDTO } from "../types/applicants.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getServiceHeaders = (): Record<string, string> => {
  // Manejo seguro de localStorage para evitar errores "localStorage is not defined" en Server Components
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getApplicantsByOfferId = async (
  offerId: string,
  page: number = 0,
  size: number = 20
): Promise<PaginatedApplicants> => {
  if (!offerId) {
    throw new Error("Se requiere el ID de la oferta para buscar postulantes.");
  }

  try {
    const res = await fetch(`${API_URL}/applicants/offer/${offerId}?page=${page}&size=${size}`, {
      method: "GET",
      headers: getServiceHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        // Retornar una estructura paginada vacía si no hay postulantes
        return {
          content: [],
          pageable: {},
          last: true,
          totalPages: 0,
          totalElements: 0,
          first: true,
          size,
          number: page,
          sort: {},
          numberOfElements: 0,
          empty: true,
        } as PaginatedApplicants;
      }
      throw new Error(`Error del servidor al obtener postulantes: ${res.status}`);
    }

    const data = await res.json();
    console.log("[applicants.service] RAW response:", JSON.stringify(data?.content?.[0] ?? data, null, 2));

    // Validar y asegurar que retornamos la estructura correcta
    const normalizeApplicant = (item: any): any => {
      const s = item.student ?? item;
      return {
        applicationDate: item.applicationDate ?? item.application_date ?? "",
        student: {
          name: s.name ?? s.studentName ?? s.fullName ?? "",
          email: s.email ?? s.studentEmail ?? s.userEmail ?? item.email ?? item.studentEmail ?? "",
          imgUrl: s.imgUrl ?? s.imageUrl ?? s.img_url ?? s.profileImageUrl ?? "",
          contactNumber: s.contactNumber ?? s.contact_number ?? s.phone ?? item.contactNumber ?? "",
          description: s.description ?? s.bio ?? "",
          verificationStatus: s.verificationStatus ?? s.verified ?? false,
          studentSkills: s.studentSkills ?? s.skills ?? [],
        },
      };
    };

    if (data && Array.isArray(data.content)) {
      return { ...data, content: data.content.map(normalizeApplicant) } as PaginatedApplicants;
    }

    // Intentar buscar dentro de data.data en caso de envoltorios genéricos
    if (data.data && Array.isArray(data.data.content)) {
      return data.data as PaginatedApplicants;
    }

    // Si por alguna razón el backend devuelve un arreglo crudo en lugar de paginado
    if (Array.isArray(data)) {
      console.warn("[applicants.service] Se esperaba objeto paginado, pero se recibió un array. Aplicando fallback.");
      return {
        content: data as ApplicantDTO[],
        pageable: {},
        last: true,
        totalPages: 1,
        totalElements: data.length,
        first: true,
        size: data.length,
        number: 0,
        sort: {},
        numberOfElements: data.length,
        empty: data.length === 0,
      } as PaginatedApplicants;
    }

    console.warn("[applicants.service] Formato inesperado recibido del servidor:", data);
    throw new Error("El formato de respuesta de los postulantes no es válido.");

  } catch (error: any) {
    console.error("[applicants.service] Error en getApplicantsByOfferId:", error.message);
    throw error;
  }
};
