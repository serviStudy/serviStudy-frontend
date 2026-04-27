import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";
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
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
      const { payload } = await jwtVerify(token, secret);
      user = payload as TokenPayload;
    } catch (e) {
      console.error("JWT verification failed:", e);
    }
  }

  const safeUser: TokenPayload = user || {
    role: "STUDENT",
    name: "DEV USER",
  };

  const isEmployer = safeUser.role === "EMPLOYER";
  const isStudent = safeUser.role === "STUDENT";

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-blue-100 selection:bg-blue-200 selection:text-blue-900">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-blue-50/10" />
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')]" />
      </div>

      {/* Sidebar dinámico */}
      {isEmployer && <EmployerDashboardSidebar />}
      {isStudent && <StudentSidebar />}

      <div
        className={`flex-1 flex flex-col min-h-screen relative z-10 ${
          isEmployer || isStudent ? "lg:pl-72" : ""
        }`}
      >
        <main
          className={`flex-1 ${
            isEmployer
              ? "p-8 lg:p-12"
              : "p-4 md:p-8 lg:p-12"
          }`}
        >
          <div
            className={`${
              isEmployer ? "max-w-full" : "max-w-[1600px] mx-auto"
            } w-full`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}