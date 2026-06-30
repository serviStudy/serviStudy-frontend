import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.servistudy.site/api/v1').replace(/\/+$/, '');

/**
 * Decodifica un JWT token y extrae el payload
 */
function decodeJwtToken(token: string): any | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('[Proxy] Error decoding JWT:', error);
    return null;
  }
}

/**
 * Proxy universal para evitar errores de CORS y problemas de Service Worker en despliegue.
 * Reenvía todas las peticiones a la API externa desde el servidor de Next.js.
 */
async function handleRequest(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await context.params;

    const path = pathSegments.join('/');

    const { searchParams } = new URL(request.url);

    const queryString = searchParams.toString();

    const targetUrl =
      `${EXTERNAL_API_URL}/${path}${queryString ? `?${queryString}` : ''}`;

    const authHeader = request.headers.get('Authorization');

    const xUserId = request.headers.get('X-User-Id');
    
    // Decodificar JWT para extraer userId y role si no se proporcionan explícitamente
    let userIdFromToken: string | null = null;
    let roleFromToken: string | null = null;
    
    if (authHeader && !xUserId) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = decodeJwtToken(token);
      
      if (decoded) {
        userIdFromToken = decoded.userId || decoded.setId || decoded.user_id || decoded.id || decoded.sub || null;
        roleFromToken = decoded.role || decoded.roles || null;
        
        // Normalizar role a formato esperado por backend
        if (roleFromToken) {
          const normalizedRole = roleFromToken.toUpperCase();
          if (normalizedRole === 'ESTUDIANTE' || normalizedRole === 'STUDENT') {
            roleFromToken = 'STUDENT';
          } else if (normalizedRole === 'EMPRESA' || normalizedRole === 'EMPLOYER') {
            roleFromToken = 'EMPLOYER';
          }
        }
      }
    }

    // Configuración de la petición al backend
    const fetchOptions: RequestInit & { duplex?: 'half' } = {
      method: request.method,

      headers: {
        'Authorization': authHeader || '',
        ...(xUserId ? { 'X-User-Id': xUserId } : {}),
        ...(userIdFromToken ? { 'X-User-Id': userIdFromToken } : {}),
        ...(roleFromToken ? { 'X-User-Role': roleFromToken } : {}),
      },

      cache: 'no-store',
    };

    // Manejar el cuerpo de la petición si no es GET o HEAD
    if (request.method !== 'GET' && request.method !== 'HEAD') {

      const contentType = request.headers.get('Content-Type');

      if (contentType?.includes('multipart/form-data')) {

        /**
         * Multipart/form-data:
         * reenviar el stream RAW directamente.
         *
         * IMPORTANTE:
         * NO usar request.formData()
         * porque reconstruye el multipart y puede romper
         * el boundary que Spring Boot necesita.
         */

        fetchOptions.body = request.body;

        // Requerido por Node.js/undici al enviar streams
        fetchOptions.duplex = 'half';

        // Mantener el Content-Type ORIGINAL
        // con su boundary intacto
        if (contentType) {
          (fetchOptions.headers as Record<string, string>)['Content-Type'] =
            contentType;
        }

      } else {

        /**
         * JSON y otros tipos:
         * usar blob por compatibilidad.
         */

        const body = await request.blob().catch(() => null);

        if (body) {
          fetchOptions.body = body;
        }

        if (contentType) {
          (fetchOptions.headers as Record<string, string>)['Content-Type'] =
            contentType;
        }
      }
    }

    console.log(`[Proxy Universal] ${request.method} ${targetUrl}`);

    const response = await fetch(targetUrl, fetchOptions);

    console.log(`[Proxy Universal] Respuesta: ${response.status}`);

    // Si la respuesta es 204 (No Content)
    if (response.status === 204) {
      return new Response(null, { status: 204 });
    }

    /**
     * Leer respuesta UNA SOLA VEZ
     * para evitar "body already consumed"
     */
    const responseText = await response.text();

    try {

      const json = JSON.parse(responseText);

      return NextResponse.json(json, {
        status: response.status,
      });

    } catch {

      return new Response(responseText, {
        status: response.status,

        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

  } catch (error: any) {

    console.error('[Proxy Universal] Error:', error);

    return NextResponse.json(
      {
        message: 'Error en el proxy universal',
        error: error?.message || 'Unknown error',
      },
      {
        status: 500,
      }
    );
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PATCH = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;