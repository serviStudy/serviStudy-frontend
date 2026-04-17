import { JobOfferDTO, CreateJobOfferDTO } from "../types/jobOffer.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getServiceHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token") ?? "";

  return {
    Authorization: `Bearer ${token}`,
  };
};

const parseOfferHack = (offer: any) => {
  if (!offer || !offer.description) return offer;

  let desc = offer.description;
  let contractDesc = "";
  let reqsFromHack = null;

  if (desc.includes("|||REQ:")) {
    const parts = desc.split("|||REQ:");
    desc = parts[0];
    try {
      reqsFromHack = JSON.parse(parts[1]);
    } catch(e) {}
  }

  if (desc.includes("|||CONTRACT:")) {
    const parts = desc.split("|||CONTRACT:");
    desc = parts[0];
    contractDesc = parts[1];
  }

  offer.description = desc;
  offer.contractDescription = contractDesc;
  offer.contract_description = contractDesc;

  if (reqsFromHack) {
    offer.requirements = reqsFromHack.map((r: string) => ({ requirementName: r, name: r }));
  }

  return offer;
};

export const getEmployerOffers = async (): Promise<JobOfferDTO[]> => {
  const res = await fetch(`${API_URL}/offers/employer`, {
    headers: getServiceHeaders(),
  });

  if (!res.ok) throw new Error("Error al obtener las ofertas");

  const data = await res.json();
  const list = data.data ?? data;
  return (list as any[]).map(parseOfferHack) as JobOfferDTO[];
};

export const getEmployerOfferById = async (id: string): Promise<JobOfferDTO | undefined> => {
  const res = await fetch(`${API_URL}/offers/${id}`, {
    headers: getServiceHeaders(),
  });

  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error("Error al obtener la oferta");

  const resData = await res.json().catch(() => null);
  return parseOfferHack(resData?.data ?? resData) as JobOfferDTO;
};

export const createJobOffer = async (data: CreateJobOfferDTO) => {
  const transformedData = {
    ...data,
    establishment_address: data.establishmentAddress,
    work_days: data.workDays,
    work_schedule: data.workSchedule,
    salary_description: data.salaryDescription,
    description: data.contractDescription ? `${data.description}|||CONTRACT:${data.contractDescription}` : data.description,
    requirements: data.requirements.map((req) => ({
      requirementName: req,
      name: req
    })),
  };

  const res = await fetch(`${API_URL}/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify(transformedData),
  });

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(resData?.message || "Error al crear la oferta");
  }

  // Si no hay cuerpo en la respuesta exitosa, devolvemos un objeto de éxito genérico
  if (!resData) return { success: true };

  return resData.data ?? resData;
};

export const updateJobOffer = async (id: string, data: CreateJobOfferDTO) => {
  const transformedData = {
    ...data,
    establishment_address: data.establishmentAddress,
    work_days: data.workDays,
    work_schedule: data.workSchedule,
    salary_description: data.salaryDescription,
    description: `${data.description}${data.contractDescription ? `|||CONTRACT:${data.contractDescription}` : ''}|||REQ:${JSON.stringify(data.requirements)}`,
    requirements: data.requirements.map((req) => ({
      requirementName: req,
      name: req
    })),
  };

  const res = await fetch(`${API_URL}/offers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify(transformedData),
  });

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(resData?.message || "Error al actualizar la oferta");
  }

  return resData?.data ?? resData ?? { success: true };
};

export const updateJobOfferStatus = async (id: string, status: "ACTIVE" | "DISABLED" | "DELETED") => {
  // First attempt: specific status endpoint
  let res = await fetch(`${API_URL}/offers/${id}/status?status=${status}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify({ status }),
  });

  // Fallback: regular patch endpoint if the previous gives 404
  if (res.status === 404) {
    res = await fetch(`${API_URL}/offers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getServiceHeaders(),
      },
      body: JSON.stringify({ status }),
    });
  }

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(resData?.message || "Error al cambiar el estado de la oferta");
  }

  return resData?.data ?? resData ?? { success: true };
};

export const addRequirementToOffer = async (offerId: string, requirementName: string) => {
  const res = await fetch(`${API_URL}/offers/${offerId}/requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify({ name: requirementName }),
  });

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(resData?.message || "Error al agregar requisito");
  }

  return resData?.data ?? resData ?? { success: true };
};

export const removeRequirementFromOffer = async (offerId: string, requirementId: string) => {
  const res = await fetch(`${API_URL}/offers/${offerId}/requirements`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify({ id_requirement: requirementId }),
  });

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(resData?.message || "Error al eliminar requisito");
  }

  return resData?.data ?? resData ?? { success: true };
};