import { NextResponse } from 'next/server';

const PROFILE_API_URL = 'https://api.servistudy.site/api/v1/profiles/employer/me';
const EXTERNAL_OFFERS_URL = 'https://api.servistudy.site/api/v1/offers';

// --- PERFORMANCE CACHE ---
const IDENTITY_CACHE = new Map<string, { id: string, expires: number }>();
const CACHE_TTL = 10 * 60 * 1000;

async function getVerifiedEmployerId(authHeader: string) {
  const now = Date.now();
  const cached = IDENTITY_CACHE.get(authHeader);
  
  if (cached && cached.expires > now) {
    return cached.id;
  }

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No hay token' }, { status: 401 });
    }

    const { id } = await params;
    const verifiedEmployerId = await getVerifiedEmployerId(authHeader);
    
    console.log(`[Proxy GET] Obteniendo oferta ${id} para empleador ${verifiedEmployerId}`);

    const response = await fetch(`${EXTERNAL_OFFERS_URL}/${id}`, {
      headers: { 
        'Authorization': authHeader,
        'X-User-Id': verifiedEmployerId,
        'X-Employer-Id': verifiedEmployerId
      },
      next: { revalidate: 0 }
    });

    if (response.status === 204) {
      return new Response(null, { status: 204 });
    }
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error en proxy GET offer', error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No hay token' }, { status: 401 });
    }

    const { id } = await params;
    const verifiedEmployerId = await getVerifiedEmployerId(authHeader);
    const body = await request.json().catch(() => ({}));

    console.log(`[Proxy PATCH] Actualizando oferta ${id} para empleador ${verifiedEmployerId}`);

    const response = await fetch(`${EXTERNAL_OFFERS_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'X-User-Id': verifiedEmployerId,
        'X-Employer-Id': verifiedEmployerId
      },
      body: JSON.stringify({
        ...body,
        employerId: verifiedEmployerId 
      }),
    });

    if (response.status === 204) {
      return new Response(null, { status: 204 });
    }
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error en proxy PATCH offer', error: error.message }, { status: 500 });
  }
}
