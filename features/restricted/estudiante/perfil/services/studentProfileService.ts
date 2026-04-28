import { getAuthHeaders } from "@/lib/api/authHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STUDENT_PROFILE_URL = `${API_URL}/profiles/student`;

import { StudentProfileResponse, StudentProfileUpdateData } from '../types/studentProfile.types';

// GET PROFILE
export const getStudentProfile = async (): Promise<StudentProfileResponse | null> => {
  const res = await fetch(STUDENT_PROFILE_URL, {
    headers: getAuthHeaders()
  });

  if (res.status === 404) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener el perfil de estudiante");

  return data.data ?? data;
};



export const updateStudentProfile = async (
  profileData: StudentProfileUpdateData
): Promise<StudentProfileResponse> => {
  const formData = new FormData();

  const profileJson = {
    name: profileData.name,
    contactNumber: profileData.contactNumber,
    description: profileData.description,
    workSchedule: profileData.jornada
  };

  formData.append(
    "data",
    new Blob([JSON.stringify(profileJson)], { type: "application/json" })
  );

  if (profileData.imageFile) {
    formData.append("image", profileData.imageFile);
  }

  const res = await fetch(STUDENT_PROFILE_URL, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders()
    },
    body: formData
  });

  if (!res.ok) {
    let errorDetail = "";
    try {
      const err = await res.json();
      errorDetail = JSON.stringify(err);
    } catch {
      errorDetail = await res.text();
    }
    throw new Error(errorDetail || `Error ${res.status}`);
  }

  if (res.status === 204) return {};
  try {
      const data = await res.json();
      return data.data ?? data;
  } catch {
      return {};
  }
};

// ADD SKILL
export const addStudentSkill = async (skillName: string): Promise<void> => {
  const res = await fetch(`${STUDENT_PROFILE_URL}/skills`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ skillName })
  });

  if (!res.ok) throw new Error("Error al agregar habilidad");
};

// DELETE SKILL
export const deleteStudentSkill = async (id: number): Promise<void> => {
  const res = await fetch(`${STUDENT_PROFILE_URL}/skills?id=${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Error al eliminar habilidad");
};

// ADD WORK DAY
export const addStudentWorkDay = async (
  userId: string,
  days: string[]
): Promise<void> => {

  const res = await fetch(`${STUDENT_PROFILE_URL}/days`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()    
    },
    body: JSON.stringify({ days }) // 👈 CLAVE
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error: ${errorText}`);
  }
};


// // DELETE WORK DAY
// export const deleteStudentWorkDay = async (userId: string, days: string[]): Promise<void> => {
//   if (!days || days.length === 0) return;
//   const qs = days.map(d => `day=${d}`).join('&');
//   const res = await fetch(`${STUDENT_PROFILE_URL}/days?${qs}`, {
//     method: "DELETE",
//     headers: {
//       ...getAuthHeaders(),
//     }
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`Error al eliminar días laborables: ${errorText}`);
//   }
// };

export const syncStudentWorkDays = async (days: string[]): Promise<void> => {
  const normalizedDays = Array.from(
    new Set(days.map((d) => d.trim().toUpperCase()))
  );

  const res = await fetch(`${STUDENT_PROFILE_URL}/days`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      days: normalizedDays,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al sincronizar días: ${errorText}`);
  }
};