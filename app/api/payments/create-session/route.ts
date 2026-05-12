import { NextResponse } from "next/server";

const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/payments/create-session`;

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No hay token" }, { status: 401 });
    }

    const body = await request.json();

    console.log(`[Create Session Proxy] Llamando a: ${BACKEND_URL}`);

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        userId: body.userId,
        planId: body.planId,
        amount: body.amount,
      }),
      // Evitar cachear esta petición
      cache: "no-store",
    });

    console.log(`[Create Session Proxy] Respuesta backend: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "N/A");
      console.error(`[Create Session Proxy] Error backend: ${errorText}`);
      return NextResponse.json(
        { message: "Error al crear sesión en el backend", error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error(`[Create Session Proxy] Exception: ${error.message}`);
    return NextResponse.json(
      { message: "Error interno en proxy de pagos", error: error.message },
      { status: 500 }
    );
  }
}
