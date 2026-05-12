import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://api.servistudy.site/api/v1';

/**
 * Proxy universal para evitar errores de CORS y problemas de Service Worker en despliegue.
 * Reenvía todas las peticiones a la API externa desde el servidor de Next.js.
 */
async function handleRequest(request: Request, context: { params: Promise<{ path: string[] }> }) {
  try {
    const { path: pathSegments } = await context.params;
    const path = pathSegments.join('/');
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = `${EXTERNAL_API_URL}/${path}${queryString ? `?${queryString}` : ''}`;

    const authHeader = request.headers.get('Authorization');
    const xUserId = request.headers.get('X-User-Id');
    
    // Configuración de la petición al backend
    const fetchOptions: RequestInit = {
      method: request.method,
      headers: {
        'Authorization': authHeader || '',
        ...(xUserId ? { 'X-User-Id': xUserId } : {}),
      },
      cache: 'no-store',
    };

    // Manejar el cuerpo de la petición si no es GET o HEAD
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const contentType = request.headers.get('Content-Type');
      
      if (contentType?.includes('multipart/form-data')) {
        // Para multipart (imágenes), clonamos el FormData
        const formData = await request.formData();
        fetchOptions.body = formData;
        // Nota: No establecemos Content-Type manualmente para multipart, 
        // el navegador lo hará con el boundary correcto.
      } else {
        // Para JSON y otros
        const body = await request.blob();
        fetchOptions.body = body;
        if (contentType) {
          (fetchOptions.headers as Record<string, string>)['Content-Type'] = contentType;
        }
      }
    }

    console.log(`[Proxy Universal] ${request.method} ${targetUrl}`);

    const response = await fetch(targetUrl, fetchOptions);

    console.log(`[Proxy Universal] Respuesta: ${response.status}`);

    // Si la respuesta es 204 (No Content), retornamos una respuesta vacía
    if (response.status === 204) {
      return new Response(null, { status: 204 });
    }

    // Para otros tipos de respuesta, intentamos obtener el JSON o el texto
    const data = await response.json().catch(() => null);
    
    if (data) {
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text().catch(() => '');
      return new Response(text, { status: response.status, headers: { 'Content-Type': 'text/plain' } });
    }

  } catch (error: any) {
    console.error('[Proxy Universal] Error:', error.message);
    return NextResponse.json(
      { message: 'Error en el proxy universal', error: error.message },
      { status: 500 }
    );
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PATCH = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
