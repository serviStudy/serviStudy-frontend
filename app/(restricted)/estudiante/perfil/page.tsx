import { ProfileClient } from "@/features/restricted/estudiante/perfil/components/ProfileClient";
import { decodeJwt, JWTPayload } from "jose";
import { cookies } from "next/headers";

interface TokenPayload extends JWTPayload {
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let subscriptionStatus: "ACTIVE" | "INACTIVE" = "INACTIVE";

  if (token){
    try{
      const decoded = decodeJwt(token) as TokenPayload;
      subscriptionStatus = decoded.subscriptionStatus || "INACTIVE";
    }catch (e) {
      console.error("Error decodificando token")
    }
  }

  return <ProfileClient subscriptionStatus={subscriptionStatus} />;
}