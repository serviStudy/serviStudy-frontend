import { Header } from '@/features/landing/components/Header'

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer>
        <div className="w-full bg-white text-[#6f6f6f] p-5 text-center flex-col md:p-2.5">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ServiStudy. Todos los derechos reservados.
          </p>
          <p className="text-xs">
            Conectando talento estudiantil con oportunidades.
          </p>
        </div>
      </footer>
    </div>
  )
}