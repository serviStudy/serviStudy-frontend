import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://api.servistudy.site/api/v1';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No hay token de autorización' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? '0';
    const size = searchParams.get('size') ?? '20';

    console.log(`[Proxy Students] GET /profiles/student?page=${page}&size=${size}`);

    // Intentamos obtener todos los perfiles de estudiantes
    // Nota: El backend debe permitir este acceso a los empleadores
    const response = await fetch(
      `${EXTERNAL_API_URL}/profiles/student?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    console.log(`[Proxy Students] Respuesta backend: ${response.status}`);

    if (response.status === 404) {
      return NextResponse.json(
        {
          content: [],
          pageable: {},
          last: true,
          totalPages: 0,
          totalElements: 0,
          first: true,
          size: Number(size),
          number: Number(page),
          sort: {},
          numberOfElements: 0,
          empty: true,
        },
        { status: 200 }
      );
    }

    if (response.status === 204) {
      return new Response(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('[Proxy Students] Error:', error.message);
    return NextResponse.json(
      { message: 'Error en proxy de estudiantes', error: error.message },
      { status: 500 }
    );
  }
}
