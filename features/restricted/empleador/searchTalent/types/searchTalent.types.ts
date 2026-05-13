export interface StudentSkill {
  id: number;
  skillName: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  contactNumber?: string;
  description?: string;
  verificationStatus?: boolean;
  imgUrl?: string;
  workDays?: string[];
  workSchedule?: string;
  studentSkills: StudentSkill[];
  compatibilityScore?: number;
}

export interface PaginatedStudents {
  content: StudentProfile[];
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
