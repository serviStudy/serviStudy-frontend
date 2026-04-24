export interface StudentSkill {
  id?: number;
  skillName: string;
}

export interface StudentProfileResponse {
  id?: string;
  userId?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  description?: string;
  verifyStatus?: boolean;
  imgUrl?: string;
  workDays?: string[];
  workSchedule?: string;
  studentSkills?: StudentSkill[];
}

export interface StudentProfileUpdateData {
  name?: string;
  contactNumber?: string;
  description?: string;
  jornada?: string | null;
  imageFile?: File;
}
