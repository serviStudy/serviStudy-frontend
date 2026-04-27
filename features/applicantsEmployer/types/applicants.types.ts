export interface StudentSkill {
  id: number;
  skillName: string;
}

export interface ApplicantStudent {
  imgUrl?: string;
  name: string;
  email: string;
  verificationStatus?: boolean;
  contactNumber?: string;
  description?: string;
  studentSkills: StudentSkill[];
}

export interface ApplicantDTO {
  applicationDate: string;
  student: ApplicantStudent;
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
