import { getAuthHeaders } from "@/lib/api/authHeaders";

const API_URL = "/api/proxy";
const INTERACTIONS_URL = `${API_URL}/interactions`;

export interface LikeResponse {
  id: string;
  senderProfileId: string;
  senderType: "STUDENT" | "EMPLOYER";
  targetProfileId: string;
  targetType: "STUDENT" | "EMPLOYER";
  createdAt: string;
  matchCreated: boolean;
  // Extra resolved fields
  resolvedProfile?: {
    id: string;
    name: string;
    imageUrl: string;
    imgUrl?: string;
    email?: string;
    contactNumber?: string;
    description?: string;
    skills?: string[];
    studentSkills?: any[];
  };
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// Memory caches for batch resolved profiles
const studentCache = new Map<string, any>();
const employerCache = new Map<string, any>();

/**
 * Fetch profile details in batch for students by making concurrent individual requests
 */
export const fetchStudentProfilesBatch = async (ids: string[]): Promise<any[]> => {
  const uniqueIdsToFetch = ids.filter(id => !studentCache.has(id) && id != null);
  if (uniqueIdsToFetch.length === 0) {
    return ids.map(id => studentCache.get(id)).filter(Boolean);
  }

  try {
    await Promise.all(uniqueIdsToFetch.map(async (id) => {
      try {
        const res = await fetch(`${API_URL}/profiles/student/${id}`, {
          method: "GET",
          headers: getAuthHeaders()
        });
        if (res.ok) {
          const result = await res.json();
          const s = result.data || result;
          if (s) {
            const profileId = s.studentProfileId || s.id || s.userId || id;
            studentCache.set(profileId, s);
            if (s.studentProfileId) studentCache.set(s.studentProfileId, s);
            if (s.id) studentCache.set(s.id, s);
            if (s.userId) studentCache.set(s.userId, s);
            studentCache.set(id, s); // Ensure the requested ID is also cached
          }
        }
      } catch (err) {
        console.error(`Error fetching student profile ${id}:`, err);
      }
    }));
  } catch (error) {
    console.error("Error fetching student batch info:", error);
  }

  return ids.map(id => studentCache.get(id)).filter(Boolean);
};

/**
 * Fetch profile details in batch for employers by making concurrent individual requests
 */
export const fetchEmployerProfilesBatch = async (ids: string[]): Promise<any[]> => {
  const uniqueIdsToFetch = ids.filter(id => !employerCache.has(id) && id != null);
  if (uniqueIdsToFetch.length === 0) {
    return ids.map(id => employerCache.get(id)).filter(Boolean);
  }

  try {
    await Promise.all(uniqueIdsToFetch.map(async (id) => {
      try {
        const res = await fetch(`${API_URL}/profiles/employer/${id}`, {
          method: "GET",
          headers: getAuthHeaders()
        });
        if (res.ok) {
          const result = await res.json();
          const emp = result.data || result;
          if (emp) {
            const profileId = emp.employerId || emp.id || emp.userId || id;
            employerCache.set(profileId, emp);
            if (emp.employerId) employerCache.set(emp.employerId, emp);
            if (emp.id) employerCache.set(emp.id, emp);
            if (emp.userId) employerCache.set(emp.userId, emp);
            employerCache.set(id, emp); // Ensure requested ID is mapped
          }
        }
      } catch (err) {
        console.error(`Error fetching employer profile ${id}:`, err);
      }
    }));
  } catch (error) {
    console.error("Error fetching employer batch info:", error);
  }

  return ids.map(id => employerCache.get(id)).filter(Boolean);
};

// Cache for sent likes to optimize check requests
let sentLikesCache: LikeResponse[] | null = null;
let sentLikesPromise: Promise<PageResponse<LikeResponse>> | null = null;

export const clearSentLikesCache = () => {
  sentLikesCache = null;
  sentLikesPromise = null;
};

/**
 * Dar like a un perfil
 */
export const giveLike = async (targetProfileId: string): Promise<any> => {
  clearSentLikesCache();
  const res = await fetch(`${INTERACTIONS_URL}/likes`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ targetProfileId })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Error al dar Like");
  }

  return res.status === 204 ? {} : res.json();
};

/**
 * Quitar like
 */
export const removeLike = async (targetProfileId: string): Promise<void> => {
  clearSentLikesCache();
  const res = await fetch(`${INTERACTIONS_URL}/likes/${targetProfileId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Error al quitar Like");
  }
};

/**
 * Verificar si un perfil específico tiene like dado
 */
export const checkIfLiked = async (
  targetProfileId: string,
  userRole?: "STUDENT" | "EMPLOYER"
): Promise<boolean> => {
  if (!targetProfileId) return false;
  try {
    const role = userRole || (localStorage.getItem("user_role") || "STUDENT").toUpperCase() as "STUDENT" | "EMPLOYER";

    if (sentLikesCache) {
      return sentLikesCache.some(like => like.targetProfileId === targetProfileId);
    }

    if (!sentLikesPromise) {
      sentLikesPromise = getSentLikes(0, 100, role);
    }

    const data = await sentLikesPromise;
    sentLikesCache = data.content || [];
    return sentLikesCache.some(like => like.targetProfileId === targetProfileId);
  } catch (error) {
    console.error("Error in checkIfLiked:", error);
    return false;
  }
};


/**
 * Obtener likes enviados y resolver sus perfiles
 */
export const getSentLikes = async (
  page: number = 0,
  size: number = 10,
  userRole: "STUDENT" | "EMPLOYER"
): Promise<PageResponse<LikeResponse>> => {
  const res = await fetch(`${INTERACTIONS_URL}/likes/sent?page=${page}&size=${size}`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    throw new Error("Error al obtener likes enviados");
  }

  const data = await res.json();
  const pageResponse: PageResponse<LikeResponse> = data.data || data;

  if (!pageResponse.content || pageResponse.content.length === 0) {
    return pageResponse;
  }

  const targetIds = pageResponse.content.map(like => like.targetProfileId);

  // Si somos STUDENT, enviamos likes a EMPLOYERs. Si somos EMPLOYER, a STUDENTs.
  if (userRole === "STUDENT") {
    await fetchEmployerProfilesBatch(targetIds);
    pageResponse.content = pageResponse.content.map(like => {
      const emp = employerCache.get(like.targetProfileId);
      return {
        ...like,
        resolvedProfile: emp ? {
          ...emp,
          id: emp.employerId || emp.id || emp.userId,
          name: emp.businessName || emp.employerName || "Empresa sin nombre",
          imageUrl: emp.imageUrl || emp.image_url || "",
          description: "Perfil de Empleador"
        } : undefined
      };
    });
  } else {
    await fetchStudentProfilesBatch(targetIds);
    pageResponse.content = pageResponse.content.map(like => {
      const stu = studentCache.get(like.targetProfileId);
      return {
        ...like,
        resolvedProfile: stu ? {
          ...stu,
          id: stu.studentProfileId || stu.id || stu.userId,
          name: stu.name || stu.firstName || "Estudiante sin nombre",
          imageUrl: stu.imgUrl || stu.imageUrl || stu.profilePictureUrl || "",
          imgUrl: stu.imgUrl || stu.imageUrl || stu.profilePictureUrl || "",
          email: stu.email,
          contactNumber: stu.contactNumber,
          description: stu.description || "",
          studentSkills: stu.studentSkills || ((stu.skills && Array.isArray(stu.skills)) ? stu.skills.map((s: any) => ({ skillName: s })) : [])
        } : undefined
      };
    });
  }

  return pageResponse;
};

/**
 * Obtener likes recibidos y resolver sus perfiles
 */
export const getReceivedLikes = async (
  page: number = 0,
  size: number = 10,
  userRole: "STUDENT" | "EMPLOYER"
): Promise<PageResponse<LikeResponse>> => {
  const res = await fetch(`${INTERACTIONS_URL}/likes/received?page=${page}&size=${size}`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    throw new Error("Error al obtener likes recibidos");
  }

  const data = await res.json();
  const pageResponse: PageResponse<LikeResponse> = data.data || data;

  if (!pageResponse.content || pageResponse.content.length === 0) {
    return pageResponse;
  }

  const senderIds = pageResponse.content.map(like => like.senderProfileId);

  // Si somos STUDENT, recibimos likes de EMPLOYERs. Si somos EMPLOYER, de STUDENTs.
  if (userRole === "STUDENT") {
    await fetchEmployerProfilesBatch(senderIds);
    pageResponse.content = pageResponse.content.map(like => {
      const emp = employerCache.get(like.senderProfileId);
      return {
        ...like,
        resolvedProfile: emp ? {
          ...emp,
          id: emp.employerId || emp.id || emp.userId,
          name: emp.businessName || emp.employerName || "Empresa sin nombre",
          imageUrl: emp.imageUrl || emp.image_url || "",
          description: "Perfil de Empleador"
        } : undefined
      };
    });
  } else {
    await fetchStudentProfilesBatch(senderIds);
    pageResponse.content = pageResponse.content.map(like => {
      const stu = studentCache.get(like.senderProfileId);
      return {
        ...like,
        resolvedProfile: stu ? {
          ...stu,
          id: stu.studentProfileId || stu.id || stu.userId,
          name: stu.name || stu.firstName || "Estudiante sin nombre",
          imageUrl: stu.imgUrl || stu.imageUrl || stu.profilePictureUrl || "",
          imgUrl: stu.imgUrl || stu.imageUrl || stu.profilePictureUrl || "",
          email: stu.email,
          contactNumber: stu.contactNumber,
          description: stu.description || "",
          studentSkills: stu.studentSkills || ((stu.skills && Array.isArray(stu.skills)) ? stu.skills.map((s: any) => ({ skillName: s })) : [])
        } : undefined
      };
    });
  }

  return pageResponse;
};
