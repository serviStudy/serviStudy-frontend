import { NextResponse } from "next/server";

const BACKEND_PLANS_URL = `${process.env.NEXT_PUBLIC_API_URL}/plans`;

/**
 * GET /api/plans?role=STUDENT|EMPLOYER
 *
 * Proxy server-side: agrega X-User-Role al request hacia el backend,
 * evitando el bloqueo de CORS que ocurre cuando el browser envía
 * headers personalizados directamente al dominio externo.
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No hay token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    console.log(`[Plans Proxy] Llamando a: ${BACKEND_PLANS_URL} con rol: ${role}`);

    if (!role || !["STUDENT", "EMPLOYER"].includes(role)) {
      return NextResponse.json(
        { message: "Parámetro role inválido. Usar STUDENT o EMPLOYER." },
        { status: 400 }
      );
    }

    const response = await fetch(BACKEND_PLANS_URL, {
      headers: {
        Authorization: authHeader,
        "X-User-Role": role,
      },
      next: { revalidate: 0 },
    });

    console.log(`[Plans Proxy] Respuesta backend: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "N/A");
      console.error(`[Plans Proxy] Error backend: ${errorText}`);
    }

    const data = await response.json().catch(() => []);
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`[Plans Proxy] Exception: ${error.message}`);
    return NextResponse.json(
      { message: "Error en proxy de planes", error: error.message },
      { status: 500 }
    );
  }
}

