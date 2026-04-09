import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="flex h-16 px-4 md:px-6 w-full items-center justify-between lg:px-16 ">
          
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.jpg"
                alt="Logo ServiStudy"
                width={300}          
                height={300}
                priority
                className="h-12 w-auto md:h-14 lg:h-14" 
              />
            </Link>

            <Link href="/" className="flex items-center">
              <h1 className="text-blue-900 font-extrabold text-[19px] md:text-[24px] lg:text-[24px]">
                Servi<span className="text-blue-500">Study</span>
              </h1>
            </Link>
          </div>


          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="text-sm font-bold text-[#1e40af] active:hover:bg-[#1e40af]/10 active:focus:ring-[#1e40af]/50 lg:hover:bg-[#1e40af]/10 lg:focus:ring-[#1e40af]/50">
              <Link href="/login">Iniciar sesión</Link>
            </Button>

            <Button
              size="sm"
              asChild
              className="hidden sm:inline-flex bg-[#1e40af] hover:bg-[#1e40af]/90 text-white">
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}