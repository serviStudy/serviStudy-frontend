import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";
import { HeaderStudent } from "@/components/shared/HeaderStudent";
import { EmployerDashboardSidebar } from "@/components/shared/EmployerDashboardSidebar";

interface TokenPayload extends JWTPayload {
  role: "EMPLOYER" | "STUDENT";
  name: string;
}

async function getUserFromToken(): Promise<TokenPayload | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export default async function RestrictedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  const safeUser = user ?? {
    role: "EMPLOYER",
    name: "DEV USER",
  };

  const isEmployer = safeUser.role === "EMPLOYER";

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-white selection:bg-green-100 selection:text-green-900">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-white to-blue-50/10" />
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-green-100/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')]" />
      </div>

      {isEmployer && <EmployerDashboardSidebar />}

      <div className={`flex-1 flex flex-col min-h-screen relative z-10 ${isEmployer ? 'lg:pl-72' : ''}`}>
        {!isEmployer && (
           <HeaderStudent name={safeUser.name} />
        )}

        <main className={`flex-1 ${isEmployer ? 'p-8 lg:p-12' : 'pt-20 px-4 md:px-6 lg:px-16'}`}>
          <div className={`${isEmployer ? 'max-w-full' : 'max-w-7xl mx-auto'} w-full`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}