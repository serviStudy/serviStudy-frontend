export type JobOfferStatus = "ACTIVE" | "DISABLED" | "DELETED";

export type WorkSchedule = "FULL_TIME" | "PART_TIME" | "FLEXIBLE";

export type DayWeek =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

export interface RequirementDTO {
    name?: string;
    requirementName?: string;
}

export interface Offer {
    jobOfferId: string;
    establishmentAddress: string;
    workDays: DayWeek[];
    workSchedule: WorkSchedule;
    status: JobOfferStatus;
    requirements: RequirementDTO[];
}