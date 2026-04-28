import { JobOfferDTO, CreateJobOfferDTO } from "../types/jobOffer.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getServiceHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token") ?? "";

  return {
    Authorization: `Bearer ${token}`,
  };
};

const parseOfferHack = (offer: any) => {
  if (!offer) return offer;

  // Garantizar que siempre haya un 'jobOfferId' válido y accesible
  let foundId = offer.jobOfferId || offer.job_offer_id || offer.id_job_offer || offer.idJobOffer || offer.offerId || offer.offer_id || offer.id;
  
  if (!foundId) {
    const idKey = Object.keys(offer).find(key => key.toLowerCase().includes('id') && key !== 'employerId' && key !== 'employer_id');
    if (idKey) foundId = offer[idKey];
  }

  offer.jobOfferId = foundId;
  offer.id = foundId;

  // --- DIAGNÓSTICO: ver el objeto completo crudo ---
  console.log(`[parseOfferHack] Objeto crudo de oferta:`, JSON.stringify(offer, null, 2));

  // --- NORMALIZACIÓN DE ESTADO ---
  // Buscar el status en múltiples campos posibles que el backend puede usar
  const rawStatus = 
    offer.status ?? 
    offer.offerStatus ?? 
    offer.offer_status ?? 
    offer.active ?? 
    offer.isActive ?? 
    offer.is_active ?? 
    null;

  const rawStatusStr = String(rawStatus ?? "").toUpperCase().trim();

  console.log(`[parseOfferHack] status detectado:`, rawStatus, "| str:", rawStatusStr, "| typeof:", typeof rawStatus);

  const isActiveByStr = ["ACTIVE", "ACTIVA", "ACTIVO", "ENABLED", "TRUE", "1"].includes(rawStatusStr);
  const isActiveByBool = rawStatus === true || rawStatus === 1;
  const isDeletedByStr = ["DELETED", "ELIMINADO", "ELIMINADA", "REMOVED"].includes(rawStatusStr);

  if (isActiveByStr || isActiveByBool) {
    offer.status = "ACTIVE";
  } else if (isDeletedByStr) {
    offer.status = "DELETED";
  } else {
    offer.status = "DISABLED";
  }

  if (!offer.description) return offer;

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
  const headers = getServiceHeaders();
  
  console.log("[Service] Consultando ofertas vía PROXY /api/offers");

  const res = await fetch("/api/offers", {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`[Service] Error ${res.status} al obtener ofertas`);
    throw new Error("Error al obtener las ofertas");
  }

  const data = await res.json();
  console.log("[Service] Datos crudos recibidos:", data);
  
  // Búsqueda exhaustiva de la lista de ofertas en la respuesta
  let list = null;
  if (Array.isArray(data)) {
    list = data;
  } else if (data.data && Array.isArray(data.data)) {
    list = data.data;
  } else if (data.offers && Array.isArray(data.offers)) {
    list = data.offers;
  } else if (data.job_offers && Array.isArray(data.job_offers)) {
    list = data.job_offers;
  } else if (data.jobOffers && Array.isArray(data.jobOffers)) {
     list = data.jobOffers;
  } else if (data.content && Array.isArray(data.content)) {
    // Para APIs con paginación de Spring Data
    list = data.content;
  } else {
    // Si no encontramos un array directo, buscamos cualquier propiedad que sea un array
    const possibleKey = Object.keys(data).find(k => Array.isArray(data[k]));
    if (possibleKey) list = data[possibleKey];
  }

  if (!list) {
     console.warn("[Service] No se encontró una lista de ofertas válida en la respuesta:", data);
     return [];
  }

  console.log(`[Service] Se encontraron ${list.length} ofertas potenciales bajo la clave adecuada.`);
  return list.map(parseOfferHack) as JobOfferDTO[];
};

export const getEmployerOfferById = async (id: string): Promise<JobOfferDTO | undefined> => {
  const res = await fetch(`/api/offers/${id}`, {
    headers: getServiceHeaders(),
  });

  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error("Error al obtener la oferta");

  const resData = await res.json().catch(() => null);
  return parseOfferHack(resData?.data ?? resData) as JobOfferDTO;
};

export const createJobOffer = async (data: CreateJobOfferDTO) => {
  const token = localStorage.getItem("token") || "";

  // PAYLOAD: Solo campos que el backend espera en su DTO
  const payload: Record<string, any> = {
    title: String(data.title).trim(),
    establishmentAddress: data.establishmentAddress,
    workDays: data.workDays,
    workSchedule: data.workSchedule,
    salary: Number(data.salary) || 0,
    salaryDescription: data.salaryDescription || String(data.salary),
    description: data.contractDescription ? `${data.description}|||CONTRACT:${data.contractDescription}` : data.description,
    requirements: data.requirements.length > 0 
      ? data.requirements.map(req => ({ requirementName: req }))
      : [],
  };

  console.log("[createJobOffer] Payload enviado al proxy:", JSON.stringify(payload, null, 2));

  // LLAMADA AL TÚNEL: Evita CORS y asegura la inyección de identidad
  const res = await fetch("/api/offers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    // Capturamos el error crudo para diagnóstico
    console.error("[createJobOffer] Error del backend:", JSON.stringify(resData, null, 2));
    console.error("[createJobOffer] Payload enviado:", JSON.stringify(payload, null, 2));
    const errorMessage = resData?.message || JSON.stringify(resData) || "Error al crear la oferta. Intenta de nuevo.";
    throw new Error(errorMessage);
  }

  return resData?.data ?? resData ?? { success: true };
};

export const updateJobOffer = async (id: string, data: CreateJobOfferDTO) => {
  // PAYLOAD: Solo campos que el backend espera en su DTO (CamelCase)
  // No enviamos employer_id ni otros snake_case para evitar el error 400
  const payload = {
    title: String(data.title).trim(),
    establishmentAddress: data.establishmentAddress,
    workDays: data.workDays,
    workSchedule: data.workSchedule,
    salary: Number(data.salary) || 0,
    salaryDescription: data.salaryDescription || String(data.salary),
    // Seguimos usando el hack de la descripción para persistir el contrato
    description: data.contractDescription ? `${data.description}|||CONTRACT:${data.contractDescription}` : data.description,
    requirements: data.requirements.length > 0 
      ? data.requirements.map(req => ({ requirementName: req }))
      : []
  };

  const res = await fetch(`/api/offers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify(payload),
  });

  const resData = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("[updateJobOffer] Error del backend:", JSON.stringify(resData, null, 2));
    throw new Error(resData?.message || "Error al actualizar la oferta");
  }

  return resData?.data ?? resData ?? { success: true };
};

export const updateJobOfferStatus = async (id: string, status: "ACTIVE" | "DISABLED" | "DELETED") => {
  // Intentar via proxy PATCH con el campo status
  const res = await fetch(`/api/offers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getServiceHeaders(),
    },
    body: JSON.stringify({ status }),
  });

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