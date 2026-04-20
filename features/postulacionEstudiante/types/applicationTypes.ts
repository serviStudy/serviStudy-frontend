export interface CreateApplicationDTO {
    jobOfferId: string
}

export interface ApplicationResponse {
    applicantId: string;
    spplicationDate: string;
    studentProfileId: string;
    jobOfferId: string;
    status: string
}