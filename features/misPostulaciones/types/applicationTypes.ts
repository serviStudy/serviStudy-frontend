export interface ApplicationJobOffer {
    jobOfferId: string;
    title: string;
    businessName: string;
    imageUrl: string;
    description: string;
    salary: string;
    salaryDescription: string;
}

export type ApplicationStatus =
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED";

export interface Application {
    applicationDate: string;
    status: ApplicationStatus;
    jobOffer: ApplicationJobOffer;
}

export interface ApplicationPageResponse {
    totalPages: number;
    totalElements: number;
    content: Application[];
}