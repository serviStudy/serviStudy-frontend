import { Offer } from '@/features/postPostularse/types/offer';
import { ActiveOffer } from '../types/ofertasActivas.types';

/**
 * Mapper para transformar una ActiveOffer (procedente del endpoint de ofertas activas)
 * en un modelo de Offer unificado para todo el frontend.
 * 
 * Esta solución es arquitectónicamente correcta porque:
 * 1. Desacopla el frontend de las inconsistencias del backend.
 * 2. Mantiene una única fuente de verdad (el tipo Offer) para los componentes.
 * 3. Centraliza la lógica de transformación, facilitando futuros cambios en el contrato del API.
 */
export const mapActiveOfferToOffer = (activeOffer: ActiveOffer): Offer => {
    return {
        id: activeOffer.jobOfferId || "",
        employerId: "", // El endpoint de ofertas activas no retorna el ID del empleador
        businessName: activeOffer.businessName,
        imageUrl: activeOffer.imageUrl,
        title: activeOffer.title,
        address: activeOffer.establishmentAddress,
        workDays: activeOffer.workDays,
        workSchedule: activeOffer.workSchedule,
        salary: activeOffer.salary,
        salaryDescription: activeOffer.salaryDescription,
        contractDescription: "", // Campo no presente en ActiveOffer
        description: activeOffer.description,
        status: "ACTIVE", // Por definición, estas ofertas están activas
        createdAt: activeOffer.createdAt,
        requirements: activeOffer.requirements.map((req, index) => ({
            id: index.toString(),
            name: req.requirementName
        }))
    };
};
