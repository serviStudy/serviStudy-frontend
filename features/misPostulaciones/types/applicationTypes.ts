export interface ApplicationPageResponse {
    totalPages: number;
    totalElements: number;
    pageable: Pageable;
    numberOfElements: number;
    size: number;
    content: ApplicationItem[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface ApplicationItem {
    applicantId: string;
    applicationDate: string;
    jobOffer: JobOffer;
}

export interface JobOffer {
    jobOfferId: string;
    title: string;
    businessName: string;
    imageUrl: string;
    description: string;
    salary: string;
    salaryDescription: string;
    establishmentAddress: string;
}

export interface Pageable {
    paged: boolean;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    offset: number;
    sort: Sort;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}