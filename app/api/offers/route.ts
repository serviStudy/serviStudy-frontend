import { NextResponse } from 'next/server';

const PROFILE_API_URL = 'https://api.servistudy.site/api/v1/profiles/employer/me';
const EXTERNAL_OFFERS_URL = 'https://api.servistudy.site/api/v1/offers';

// --- PERFORMANCE CACHE ---
const IDENTITY_CACHE = new Map<string, { id: string, expires: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos para balancear velocidad y frescura

async function getVerifiedEmployerId(authHeader: string) {
  const now = Date.now();
  const cached = IDENTITY_CACHE.get(authHeader);
  
  if (cached && cached.expires > now) {
    console.log("[Identity Cache] Hit - Usando ID de caché");
    return cached.id;
  }

  console.log("[Identity Cache] Miss - Consultando perfil para verificar identidad");
  const profileRes = await fetch(PROFILE_API_URL, {
    headers: { 'Authorization': authHeader }
  });

  if (profileRes.ok) {
    const profileData = await profileRes.json();
    const p = profileData.data || profileData;
    const id = p.employerId || p.employer_id || p.id || '';
    
    if (id) {
       IDENTITY_CACHE.set(authHeader, { id, expires: now + CACHE_TTL });
    }
    return id;
  }
  return '';
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No hay token' }, { status: 401 });
    }

    const verifiedEmployerId = await getVerifiedEmployerId(authHeader);
    
    // Consultamos la lista de ofertas del empleador usando su identidad verificada
    const response = await fetch(`${EXTERNAL_OFFERS_URL}/employer`, {
      headers: {
        'Authorization': authHeader,
        'X-User-Id': verifiedEmployerId,
        'X-Employer-Id': verifiedEmployerId
      },
      next: { revalidate: 0 } // No cache
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error en proxy GET', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      return NextResponse.json({ message: 'No hay token de autorización' }, { status: 401 });
    }

    // --- PASO 1: RE-VERIFICACIÓN DE IDENTIDAD EN SERVIDOR ---
    const verifiedEmployerId = await getVerifiedEmployerId(authHeader);

    // --- PASO 2: Inyectar SOLO employerId (camelCase) en el body ---
    // El backend necesita employerId para vincular la oferta al empleador.
    // NO enviamos employer_id (snake_case) porque causa 400 en el DTO del backend.
    const finalBody = {
      ...body,
      employerId: verifiedEmployerId,
    };

    console.log(`[Identity Proxy] POST - ID Verificado: ${verifiedEmployerId}`);
    console.log(`[Identity Proxy] POST - Payload:`, JSON.stringify(finalBody, null, 2));

    const response = await fetch(EXTERNAL_OFFERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-User-Id': verifiedEmployerId,
        'X-Employer-Id': verifiedEmployerId
      },
      body: JSON.stringify(finalBody),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        console.error(`[Identity Proxy] POST error ${response.status}:`, JSON.stringify(data));
        return NextResponse.json({
            ...data,
            _debug: { sentId: verifiedEmployerId, profileFound: !!verifiedEmployerId, payload: finalBody }
        }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error en el túnel de identidad', error: error.message },
      { status: 500 }
    );
  }
}
