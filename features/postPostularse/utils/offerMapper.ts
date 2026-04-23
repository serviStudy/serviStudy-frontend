// shared/utils/offerMapper.ts
import { Offer, Requirement } from "../types/offer";

export const mapToOffer = (raw: any): Offer => {
    let description = raw.description || "";
    let contractDescription = raw.contract_description || raw.contractDescription || "";
    let requirements: Requirement[] = [];

    // 1. Extraer datos del "hack" de descripción si existen
    if (description.includes("|||REQ:")) {
        const parts = description.split("|||REQ:");
        description = parts[0];
        try {
        const parsedReqs = JSON.parse(parts[1]);
        requirements = parsedReqs.map((r: string) => ({ name: r }));
        } catch (e) {
        console.warn("Error parsing requirements from description", e);
        }
    }

    if (description.includes("|||CONTRACT:")) {
        const parts = description.split("|||CONTRACT:");
        description = parts[0];
        contractDescription = parts[1];
    }

    // 2. Si el backend ya traía requisitos de forma oficial, los usamos
    if (raw.requirements && raw.requirements.length > 0) {
        requirements = raw.requirements.map((r: any) => ({
        id: r.idRequirement || r.id_requirement || r.id,
        name: r.requirementName || r.name || r,
        }));
    }

  // 3. Retornar el objeto normalizado (Siempre CamelCase)
    return {
        id: raw.jobOfferId || raw.id,
        employerId: raw.employerId || raw.employer_id,
        businessName: raw.businessName,
        imageUrl: raw.imageUrl,
        title: raw.title,
        address: raw.establishmentAddress || raw.establishment_address,
        workDays: raw.workDays || raw.work_days || [],
        workSchedule: raw.workSchedule || raw.work_schedule,
        salary: raw.salary,
        salaryDescription: raw.salaryDescription || raw.salary_description,
        contractDescription: contractDescription,
        description: description.trim(),
        status: raw.status || "ACTIVE",
        requirements: requirements,
        createdAt: raw.createdAt,
    };
};
