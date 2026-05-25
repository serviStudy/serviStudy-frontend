import { cookies } from "next/headers";
import { decodeJwt, JWTPayload } from "jose";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/features/restricted/estudiante/dashboardStudent/components/DashboardClient";

interface TokenPayload extends JWTPayload {
  role: "EMPLOYER" | "STUDENT";
  name: string;
  subscriptionStatus?: "ACTIVE" | "INACTIVE";
}

export default async function DashboardStudentPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let userName = "Estudiante";
  let subscriptionStatus: "ACTIVE" | "INACTIVE" = "INACTIVE";

  if (token) {
    try {
      const decoded = decodeJwt(token) as TokenPayload;
      userName = decoded.name || "Estudiante";
      subscriptionStatus = decoded.subscriptionStatus || "INACTIVE";
    } catch (e) {
      console.error("Error decodificando token en dashboardStudent", e);
    }
  }

  // Confirmar que tenga una subscripción activa
  if (subscriptionStatus !== "ACTIVE") {
    redirect("/estudiante/perfil");
  }

  return <DashboardClient userName={userName} />;
}
