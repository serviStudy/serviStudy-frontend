import { cookies } from "next/headers";
import { decodeJwt, JWTPayload } from "jose";
import { EmployerDashboardSidebar } from "@/components/shared/EmployerDashboardSidebar";
import { StudentSidebar } from "@/components/shared/StudentSidebar";

interface TokenPayload extends JWTPayload {
  role: "EMPLOYER" | "STUDENT";
  name: string;
}

export default async function RestrictedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: TokenPayload | null = null;


  if (token) {
    try {
      user = decodeJwt(token) as TokenPayload;
    } catch (e) {
    }
  }


  const safeUser: TokenPayload = user || {
    role: "STUDENT",
    name: "DEV USER",
  };

  const isEmployer = safeUser.role === "EMPLOYER";
  const isStudent = safeUser.role === "STUDENT";

  return (
    <div className="min-h-screen flex relative bg-blue-50 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Background Premium */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-transparent" />
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-100/10 blur-[120px]" />
      </div>

      {/* Navegación Lateral (Sidebar) por Rol */}
      <div className="relative z-50">
        {isEmployer && <EmployerDashboardSidebar />}
        {isStudent && <StudentSidebar />}
      </div>

      {/* Contenido Principal */}
      <div
        className={`flex-1 flex flex-col min-h-screen relative z-10 transition-all duration-300 ${
          isEmployer || isStudent ? "lg:pl-72" : ""
        }`}
      >
        <main
          className={`flex-1 ${
            isEmployer
              ? "p-4 pt-20 sm:pt-4 md:p-8 lg:p-10"
              : "p-4 pt-20 sm:pt-4 md:p-8 lg:p-10"
          }`}
        >
          <div
            className={`${
              isEmployer ? "max-w-full" : "max-w-5xl mx-auto"
            } w-full`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}