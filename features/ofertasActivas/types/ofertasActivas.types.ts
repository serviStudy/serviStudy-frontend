export interface OfferRequeriment {
    requirementName: string;
}

export interface ActiveOffer {
    jobOfferId?: string;
    businessName: string;
    imageUrl: string;
    title: string;
    establishmentAddress: string;
    workDays: string[];
    workSchedule: string;
    salary: number;
    salaryDescription: string;
    description: string;
    createdAt: string;
    requirements: OfferRequeriment[]
}

export interface ActiveOffersResponse {
    message: string;
    success: boolean;
    data: ActiveOffer[];
}