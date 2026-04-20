import { Application } from "../types/applicationTypes";
import { Offer } from "../types/offersTypes";
import { ApplicationCard } from "./applicationCard";

export const mapApplicationToCard = (
    application: Application,
    offer?: Offer
): ApplicationCard => {
    return {
        applicationId: application.jobOffer.jobOfferId,

        // snapshot de application
        title: application.jobOffer.title,
        businessName: application.jobOffer.businessName,
        imageUrl: application.jobOffer.imageUrl,
        salary: application.jobOffer.salary,
        salaryDescription: application.jobOffer.salaryDescription,
        description: application.jobOffer.description,

        // application info
        status: application.status,
        applicationDate: application.applicationDate,

        // offer info (completo)
        establishmentAddress: offer?.establishmentAddress ?? "",
        workDays: offer?.workDays ?? [],

        // FIX: sin "" fallback
        workSchedule: offer?.workSchedule,

        requirements:
            offer?.requirements?.map(
                (r) => r.name ?? r.requirementName ?? ""
            ) ?? [],
    };
};