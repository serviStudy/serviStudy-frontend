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
  id_requirement?: string;
  idRequirement?: string;
  name?: string;
  requirementName?: string;
}

export interface JobOfferDTO {
  id?: string;
  jobOfferId?: string;
  employerId: string;
  employer_id?: string;
  title: string;
  establishmentAddress: string;
  establishment_address?: string;
  workDays: DayWeek[];
  work_days?: DayWeek[];
  workSchedule: WorkSchedule;
  work_schedule?: WorkSchedule;
  salary: number;
  salaryDescription: string;
  salary_description?: string;
  contractDescription: string;
  contract_description?: string;
  description: string;
  status: JobOfferStatus;
  requirements: RequirementDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobOfferDTO {
  employerId?: string;
  title: string;
  establishmentAddress: string;
  workDays: DayWeek[];
  workSchedule: WorkSchedule;
  salary: number;
  salaryDescription: string;
  contractDescription: string;
  description: string;
  requirements: string[]; // Se envían como strings en la creación
}