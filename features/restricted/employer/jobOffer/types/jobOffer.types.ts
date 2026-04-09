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
  id_requirement: string;
  requirement_name: string;
}

export interface JobOfferDTO {
  id_job_offers: string;
  employer_id: string;
  title: string;
  establishment_address: string;
  work_days: DayWeek[];
  work_schedule: WorkSchedule;
  salary: number;
  salary_description: string;
  contract_description: string;
  status: JobOfferStatus;
  requirements: RequirementDTO[];
  created_at: string;
  updated_at: string;
}

export interface CreateJobOfferDTO {
  title: string;
  establishment_address: string;
  work_days: DayWeek[];
  work_schedule: WorkSchedule;
  salary: number;
  salary_description: string;
  contract_description: string;
  requirements: string[];
}