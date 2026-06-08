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
    email?: string;
    contactNumber?: string;
    description?: string;
    skills?: string[];
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
 * Fetch profile details in batch for students
 */
export const fetchStudentProfilesBatch = async (ids: string[]): Promise<any[]> => {
  const uniqueIdsToFetch = ids.filter(id => !studentCache.has(id));
  if (uniqueIdsToFetch.length === 0) {
    return ids.map(id => studentCache.get(id));
  }

  try {
    const res = await fetch(`${API_URL}/profiles/student/info`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids: uniqueIdsToFetch })
    });

    if (res.ok) {
      const result = await res.json();
      const list = result.data || result || [];
      list.forEach((s: any) => {
        const profileId = s.studentProfileId || s.id || s.userId;
        if (profileId) {
          studentCache.set(profileId, s);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching student batch info:", error);
  }

  return ids.map(id => studentCache.get(id)).filter(Boolean);
};

/**
 * Fetch profile details in batch for employers
 */
export const fetchEmployerProfilesBatch = async (ids: string[]): Promise<any[]> => {
  const uniqueIdsToFetch = ids.filter(id => !employerCache.has(id));
  if (uniqueIdsToFetch.length === 0) {
    return ids.map(id => employerCache.get(id));
  }

  try {
    const res = await fetch(`${API_URL}/profiles/employer/info`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids: uniqueIdsToFetch })
    });

    if (res.ok) {
      const result = await res.json();
      const list = result.data || result || [];
      list.forEach((emp: any) => {
        const profileId = emp.employerId || emp.id || emp.userId;
        if (profileId) {
          employerCache.set(profileId, emp);
        }
      });
    }
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
          id: emp.employerId,
          name: emp.businessName || "Empresa sin nombre",
          imageUrl: emp.imageUrl || "",
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
          id: stu.studentProfileId,
          name: stu.name || "Estudiante sin nombre",
          imageUrl: stu.imgUrl || "",
          email: stu.email,
          contactNumber: stu.contactNumber,
          description: stu.description || "",
          skills: (stu.studentSkills || []).map((sk: any) => sk.skillName)
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
          id: emp.employerId,
          name: emp.businessName || "Empresa sin nombre",
          imageUrl: emp.imageUrl || "",
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
          id: stu.studentProfileId,
          name: stu.name || "Estudiante sin nombre",
          imageUrl: stu.imgUrl || "",
          email: stu.email,
          contactNumber: stu.contactNumber,
          description: stu.description || "",
          skills: (stu.studentSkills || []).map((sk: any) => sk.skillName)
        } : undefined
      };
    });
  }

  return pageResponse;
};
