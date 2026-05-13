import { NextResponse } from "next/server";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * GET /api/subscriptions/me
 *
 * Proxy server-side: extrae el userId del JWT y lo agrega como
 * X-User-Id al request hacia el backend, evitando el bloqueo de CORS.
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No hay token" }, { status: 401 });
    }

    // Extraer userId del token en el servidor
    let userId: string | null = null;
    try {
      const token = authHeader.replace("Bearer ", "");
      const base64Payload = token.split(".")[1];
      const decoded: any = JSON.parse(
        Buffer.from(base64Payload, "base64").toString("utf-8")
      );
      
      // Intentar obtener ID de varios campos comunes
      userId = decoded.id ?? decoded.userId ?? decoded.user_id ?? decoded.sub ?? null;
      console.log(`[Sub Proxy] Token decodificado. userId detectado: ${userId}`);
    } catch (e: any) {
      console.error(`[Sub Proxy] Error decodificando token: ${e.message}`);
      return NextResponse.json({ message: "Token malformado" }, { status: 401 });
    }

    if (!userId) {
      console.error(`[Sub Proxy] No se encontró un ID válido en el payload del token`);
      return NextResponse.json({ message: "No se pudo obtener el userId del token" }, { status: 401 });
    }

    const targetUrl = `${BACKEND_URL}/subscriptions/me`;
    console.log(`[Sub Proxy] Llamando a backend: ${targetUrl} con X-User-Id: ${userId}`);

    const response = await fetch(targetUrl, {
      headers: {
        Authorization: authHeader,
        "X-User-Id": userId,
      },
      next: { revalidate: 0 },
    });

    console.log(`[Sub Proxy] Respuesta backend: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "N/A");
      console.error(`[Sub Proxy] Error backend detail: ${errorText}`);
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`[Sub Proxy] Exception: ${error.message}`);
    return NextResponse.json(
      { message: "Error en proxy de suscripción", error: error.message },
      { status: 500 }
    );
  }
}

