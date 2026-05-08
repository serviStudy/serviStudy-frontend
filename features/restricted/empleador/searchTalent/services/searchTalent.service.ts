import { PaginatedStudents, StudentProfile } from "../types/searchTalent.types";

const getServiceHeaders = (): Record<string, string> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getStudents = async (
  page: number = 0,
  size: number = 20
): Promise<PaginatedStudents> => {
  try {
    // MOCK DATA para desarrollo (ya que el endpoint no está creado)
    const mockStudents: StudentProfile[] = [
      {
        id: "1",
        userId: "u1",
        name: "Juan Pérez",
        email: "juan.perez@edu.co",
        imgUrl: "",
        contactNumber: "3001234567",
        description: "Estudiante de Ingeniería de Sistemas apasionado por el desarrollo web con React y Node.js.",
        verificationStatus: true,
        studentSkills: [
          { id: 1, skillName: "React" },
          { id: 2, skillName: "Node.js" },
          { id: 3, skillName: "TypeScript" }
        ],
        workDays: ["Lunes", "Miércoles", "Viernes"],
        workSchedule: "Mañana"
      },
      {
        id: "2",
        userId: "u2",
        name: "María García",
        email: "m.garcia@edu.co",
        imgUrl: "",
        contactNumber: "3109876543",
        description: "Diseñadora UX/UI en formación. Enfocada en crear experiencias de usuario intuitivas y atractivas.",
        verificationStatus: false,
        studentSkills: [
          { id: 4, skillName: "Figma" },
          { id: 5, skillName: "Adobe XD" },
          { id: 6, skillName: "UI Design" }
        ],
        workDays: ["Martes", "Jueves"],
        workSchedule: "Tarde"
      },
      {
        id: "3",
        userId: "u3",
        name: "Carlos Rodríguez",
        email: "c.rodriguez@edu.co",
        imgUrl: "",
        contactNumber: "3201112233",
        description: "Estudiante de Administración de Empresas con excelentes habilidades de comunicación y liderazgo.",
        verificationStatus: true,
        studentSkills: [
          { id: 7, skillName: "Liderazgo" },
          { id: 8, skillName: "Excel" },
          { id: 9, skillName: "Marketing" }
        ],
        workDays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        workSchedule: "Flexible"
      }
    ];

    // Intentamos la llamada real por si acaso, pero si falla o no existe, usamos los mocks
    try {
      const res = await fetch(`/api/proxy/profiles/student?page=${page}&size=${size}`, {
        method: "GET",
        headers: getServiceHeaders(),
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const normalizeStudent = (s: any): StudentProfile => ({
          id: s.id || s.studentId || "",
          userId: s.userId || s.user_id || "",
          name: s.name || s.fullName || s.studentName || "Sin nombre",
          email: s.email || "",
          imgUrl: s.imgUrl || s.imageUrl || s.img_url || "",
          contactNumber: s.contactNumber || s.contact_number || "",
          description: s.description || s.bio || "",
          verificationStatus: s.verificationStatus || s.verified || false,
          studentSkills: s.studentSkills || s.skills || [],
          workDays: s.workDays || [],
          workSchedule: s.workSchedule || "",
        });

        if (data && Array.isArray(data.content)) {
          return { ...data, content: data.content.map(normalizeStudent) } as PaginatedStudents;
        }
      }
    } catch (e) {
      console.log("[searchTalent.service] Usando datos mock debido a error en API:", e);
    }

    // Retornar datos mock si la API falla o no devuelve contenido
    return {
      content: mockStudents,
      pageable: {},
      last: true,
      totalPages: 1,
      totalElements: mockStudents.length,
      first: true,
      size,
      number: page,
      sort: {},
      numberOfElements: mockStudents.length,
      empty: false,
    } as PaginatedStudents;

  } catch (error: any) {
    console.error("[searchTalent.service] Error en getStudents:", error.message);
    throw error;
  }
};
