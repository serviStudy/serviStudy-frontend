export interface StudentSkill {
  id: number;
  skillName: string;
}

export interface ApplicantStudent {
  imgUrl?: string;
  name: string;
  email: string;
  studentProfileId: string;
  verificationStatus?: boolean;
  contactNumber?: string;
  description?: string;
  studentSkills: StudentSkill[];
  workDays?: string[];
  workSchedule?: string;
}

export interface ApplicantDTO {
  applicantId: string;
  applicationDate: string;
  student: ApplicantStudent;
}

// interfaz que se va a utilizar en compatibilidad
export interface ApplicantIds {
  applicantId: string
}

export interface ApplicantsList {
  applicants: ApplicantIds[]
}

export interface PaginatedApplicants {
  content: ApplicantDTO[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  empty: boolean;
}
