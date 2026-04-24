import { Header } from '@/features/landing/components/Header'
import { getUserFromToken } from '@/features/auth/utils/getUserFromToken'
import { HeaderEmployer } from '@/components/shared/HeaderEmployer'
import { HeaderStudent } from '@/components/shared/HeaderStudent'

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromToken();

  return (
    <div className="min-h-screen flex flex-col">
      {user ? (
        user.role === "EMPLOYER" ? (
          <HeaderEmployer name={user.name} />
        ) : (
          <HeaderStudent name={user.name} />
        )
      ) : (
        <Header />
      )}
      <main className="flex-1">{children}</main>
    </div>
  )
}