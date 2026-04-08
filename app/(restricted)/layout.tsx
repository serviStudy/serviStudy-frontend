import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";
import { HeaderEmployer } from "@/components/shared/HeaderEmployer";
import { HeaderStudent } from "@/components/shared/HeaderStudent";

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

  return (
    <div className="min-h-screen flex flex-col">
      {safeUser.role === "EMPLOYER" ? (
        <HeaderEmployer name={safeUser.name} />
      ) : (
        <HeaderStudent name={safeUser.name} />
      )}

      <main className="flex-1 pt-20 px-4 md:px-6 lg:px-16 bg-gray-300">
        {children}
      </main>
    </div>
  );
}