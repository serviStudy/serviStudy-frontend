
export type JobOfferStatus = "ACTIVE" | "DISABLED" | "DELETED";
export type WorkSchedule = "FULL_TIME" | "PART_TIME" | "FLEXIBLE";

export interface Requirement {
    id?: string;
    name: string;
}

export interface Offer {
    id: string;
    employerId: string;
    businessName?: string; 
    imageUrl?: string;     
    title: string;
    address: string;
    workDays: string[];
    workSchedule: WorkSchedule | string;
    salary: number;
    salaryDescription: string;
    contractDescription: string; 
    description: string;         
    status: JobOfferStatus;
    requirements: Requirement[];
    createdAt: string;
}
