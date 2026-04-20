import { WorkSchedule } from "@/features/restricted/employer/jobOffer/types/jobOffer.types";
import { DayWeek } from "../types/offersTypes";

export interface ApplicationCard {
    applicationId: string;

    // job information (snapshot desde application)
    title: string;
    businessName: string;
    imageUrl: string;
    salary: string;
    salaryDescription: string;
    description: string;

    // application info
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    applicationDate: string;

    // offer info (completo)
    establishmentAddress: string;
    workDays: DayWeek[];

    // IMPORTANTE: ya NO fallback string
    workSchedule?: WorkSchedule;

    requirements: string[];
}