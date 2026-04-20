import { WorkSchedule } from "@/features/restricted/employer/jobOffer/types/jobOffer.types";
import { ApplicationCard } from "../hooks/applicationCard";

export const applicationCardsMock: ApplicationCard[] = [
    {
        applicationId: "app-1",

        title: "Desarrollador Frontend React",
        businessName: "Tech Solutions S.A.",
        imageUrl: "https://via.placeholder.com/150",
        salary: "$2.500.000",
        salaryDescription: "Mensual",

        description:
            "Buscamos desarrollador con experiencia en React y Tailwind CSS para proyectos web modernos.",

        status: "PENDING",
        applicationDate: "2026-04-18",

        establishmentAddress: "Medellín, Colombia",

        workDays: ["MONDAY", "WEDNESDAY", "FRIDAY"],

        workSchedule: "FULL_TIME" as WorkSchedule,

        requirements: [
            "React",
            "TypeScript",
            "CSS"
        ],
    },
    {
        applicationId: "app-2",

        title: "Diseñador UX/UI",
        businessName: "Creative Studio",
        imageUrl: "https://via.placeholder.com/150",
        salary: "$3.000.000",
        salaryDescription: "Mensual",

        description:
            "Diseño de interfaces modernas y experiencia de usuario para aplicaciones móviles.",

        status: "ACCEPTED",
        applicationDate: "2026-04-10",

        establishmentAddress: "Bogotá, Colombia",

        workDays: ["TUESDAY", "THURSDAY"],

        workSchedule: "PART_TIME" as WorkSchedule,

        requirements: [
            "Figma",
            "UX Research",
            "Prototyping"
        ],
    },
    {
        applicationId: "app-3",

        title: "Backend Developer Java",
        businessName: "Fintech Global",
        imageUrl: "https://via.placeholder.com/150",
        salary: "$4.500.000",
        salaryDescription: "Mensual",

        description:
            "Desarrollo de APIs REST con Spring Boot y microservicios.",

        status: "REJECTED",
        applicationDate: "2026-03-28",

        establishmentAddress: "Remoto",

        workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],

        workSchedule: "FULL_TIME" as WorkSchedule,

        requirements: [
            "Java",
            "Spring Boot",
            "Microservices"
        ],
    }
];