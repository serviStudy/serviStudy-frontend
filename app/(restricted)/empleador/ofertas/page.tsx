import { OfferList } from "@/features/restricted/empleador/jobOffer/components/OfferList";
import { decodeJwt, JWTPayload } from "jose";
import { cookies } from "next/headers";

interface TokenPayload extends JWTPayload {
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export default async function Page() {
  // se extrae el estado de la suscripcion del token
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

  return(
    <div className="min-h-screen ">
      {/* se inyecta al componente cliente */}
      <OfferList subscriptionStatus={subscriptionStatus}/>
    </div>
  );
}