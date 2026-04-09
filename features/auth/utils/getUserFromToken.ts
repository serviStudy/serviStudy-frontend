import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";

interface TokenPayload extends JWTPayload {
  sub: string;
  role: "STUDENT" | "EMPLOYER";
  name: string;
}

function isTokenPayload(payload: JWTPayload): payload is TokenPayload {
  return (
    typeof payload.sub === "string" &&
    (payload.role === "STUDENT" || payload.role === "EMPLOYER") &&
    typeof payload.name === "string"
  );
}

export const getUserFromToken = async (): Promise<TokenPayload | null> => {
  // prueba
  if (process.env.DEV_FAKE_AUTH === "true") {
    return {
      sub: "dev-user-id",
      role: "EMPLOYER", 
      name: "Santiago Villa (DEV)",
    };
  }


  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    if (!isTokenPayload(payload)) return null;

    return payload;
  } catch {
    return null;
  }
};