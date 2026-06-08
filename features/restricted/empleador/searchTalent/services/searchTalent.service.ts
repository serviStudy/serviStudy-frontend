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
  size: number = 20,
  search: string = ""
): Promise<PaginatedStudents> => {
  try {
    // Intentamos la llamada real al endpoint proporcionado
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      
      if (search) {
        queryParams.append("search", search);
        // También probamos con 'keyword' o 'name' por si el backend usa esos nombres
        queryParams.append("keyword", search);
      }

      const res = await fetch(`/api/proxy/profiles/student/all?${queryParams.toString()}`, {
        method: "GET",
        headers: getServiceHeaders(),
        cache: "no-store",
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log("[searchTalent.service] API response:", responseData);

        // El backend puede devolver los estudiantes en responseData.data o responseData.content
        const studentsList = responseData.data || responseData.content || (Array.isArray(responseData) ? responseData : []);

        const normalizeStudent = (s: any): StudentProfile => ({
          id: s.studentProfileId || s.id || s.studentId || "",
          userId: s.userId || s.user_id || s.id || "",
          name: s.name || s.fullName || s.studentName || "Sin nombre",
          email: s.email || "",
          imgUrl: s.imgUrl || s.imageUrl || s.img_url || "",
          contactNumber: s.contactNumber || s.contact_number || "",
          description: s.description || s.bio || "",
          verificationStatus: s.verificationStatus || s.verified || false,
          studentSkills: (s.studentSkills || s.skills || []).map((skill: any, index: number) => {
            if (typeof skill === "string") {
              return { id: index, skillName: skill };
            }
            return {
              id: skill.id || index,
              skillName: skill.skillName || skill.name || skill.label || "Habilidad",
            };
          }),
          workDays: s.workDays || [],
          workSchedule: s.workSchedule || "",
        });

        if (Array.isArray(studentsList)) {
          const normalized = studentsList.map(normalizeStudent);
          
          // Fallback: Si el backend no filtra por búsqueda, lo hacemos en el frontend
          const filtered = search 
            ? normalized.filter(s => 
                s.name.toLowerCase().includes(search.toLowerCase()) || 
                s.description?.toLowerCase().includes(search.toLowerCase()) ||
                s.studentSkills.some(sk => sk.skillName.toLowerCase().includes(search.toLowerCase()))
              )
            : normalized;

          return {
            content: filtered,
            pageable: {},
            last: true,
            totalPages: 1,
            totalElements: filtered.length,
            first: true,
            size: size,
            number: page,
            sort: {},
            numberOfElements: filtered.length,
            empty: filtered.length === 0,
          } as PaginatedStudents;
        }
      }
    } catch (e) {
      console.log("[searchTalent.service] Error en API:", e);
      throw e;
    }

    // Si llegamos aquí sin retornar, la respuesta no fue array o no fue parseable
    return {
      content: [],
      pageable: {},
      last: true,
      totalPages: 0,
      totalElements: 0,
      first: true,
      size,
      number: page,
      sort: {},
      numberOfElements: 0,
      empty: true,
    } as PaginatedStudents;

  } catch (error: any) {
    console.error("[searchTalent.service] Error en getStudents:", error.message);
    throw error;
  }
};

/**
 * Búsqueda semántica por texto (IA)
 */
export const getSemanticSearchByText = async (text: string): Promise<PaginatedStudents> => {
  try {
    const queryParams = new URLSearchParams({ text });
    
    const res = await fetch(`/api/proxy/ai/search/text?${queryParams.toString()}`, {
      method: "GET",
      headers: getServiceHeaders(),
    });

    if (!res.ok) throw new Error("Error en la búsqueda semántica por texto");
    
    const responseData = await res.json();
    return normalizeSemanticResponse(responseData);
  } catch (error: any) {
    console.error("[searchTalent.service] Error en getSemanticSearchByText:", error.message);
    throw error;
  }
};

/**
 * Búsqueda semántica por oferta (IA)
 */
export const getSemanticSearchByOffer = async (offerId: string): Promise<PaginatedStudents> => {
  try {
    const queryParams = new URLSearchParams({ id: offerId });
    const userId = typeof window !== "undefined" ? localStorage.getItem("employer_id") ?? "" : "";
    
    const res = await fetch(`/api/proxy/ai/search/offer?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        ...getServiceHeaders(),
        "X-User-Id": userId,
      },
    });

    if (!res.ok) throw new Error("Error en la búsqueda semántica por oferta");
    
    const responseData = await res.json();
    return normalizeSemanticResponse(responseData);
  } catch (error: any) {
    console.error("[searchTalent.service] Error en getSemanticSearchByOffer:", error.message);
    throw error;
  }
};

/**
 * Normaliza la respuesta de los endpoints de IA a la estructura de PaginatedStudents
 */
const normalizeSemanticResponse = (responseData: any): PaginatedStudents => {
  console.log("🔍 [AI Search Service] Raw response:", responseData);
  
  let studentsList = responseData.data || responseData.content || (Array.isArray(responseData) ? responseData : []);
  if (typeof studentsList === "string") {
    try {
      studentsList = JSON.parse(studentsList);
      console.log("🔍 [AI Search Service] Parsed data:", studentsList);
    } catch {
      console.error("🔍 [AI Search Service] Failed to parse data string");
      studentsList = [];
    }
  }

  const normalizeStudent = (s: any): StudentProfile => {
    // La respuesta de la IA viene anidada en 'profile'
    const studentData = s.profile || s;
    const rawScore = s.compatibilityScore;
    
    let compatibilityScore = rawScore;
    if (rawScore !== undefined) {
      // Solo normalizamos a 0-100 si viene en escala decimal
      compatibilityScore = rawScore <= 1 ? Math.round(rawScore * 100) : Math.round(rawScore);
      console.log(`🎯 Compatibilidad original: ${compatibilityScore}% para ${studentData.name}`);
    }

    return {
      id: studentData.studentProfileId || studentData.id || studentData.studentId || studentData.userId || studentData.id_estudiante || "",
      userId: studentData.userId || studentData.user_id || studentData.id || "",
      name: studentData.name || studentData.fullName || studentData.studentName || studentData.nombre || studentData.nombre_completo || "Sin nombre",
      email: studentData.email || studentData.userEmail || studentData.correo || studentData.email_address || "",
      imgUrl: studentData.imgUrl || studentData.imageUrl || studentData.img_url || studentData.foto || "",
      contactNumber: studentData.contactNumber || studentData.contact_number || studentData.telefono || studentData.celular || "",
      description: studentData.description || studentData.bio || studentData.descripcion || studentData.perfil_profesional || "",
      verificationStatus: studentData.verificationStatus || studentData.verified || studentData.verificado || false,
      studentSkills: (studentData.studentSkills || studentData.skills || studentData.habilidades || []).map((skill: any, index: number) => {
        if (typeof skill === "string") {
          return { id: index, skillName: skill };
        }
        return {
          id: skill.id || index,
          skillName: skill.skillName || skill.name || skill.label || skill.nombre || "Habilidad",
        };
      }),
      workDays: studentData.workDays || studentData.dias_laborales || [],
      workSchedule: studentData.workSchedule || studentData.horario || "",
      compatibilityScore: compatibilityScore,
    };
  };

  const normalized = Array.isArray(studentsList) ? studentsList.map(normalizeStudent) : [];

  return {
    content: normalized,
    pageable: {},
    last: true,
    totalPages: 1,
    totalElements: normalized.length,
    first: true,
    size: normalized.length,
    number: 0,
    sort: {},
    numberOfElements: normalized.length,
    empty: normalized.length === 0,
  } as PaginatedStudents;
};
