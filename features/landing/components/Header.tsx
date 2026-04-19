"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] py-2"
        : "bg-background/95 backdrop-blur-md py-3"
        }`}
    >
      <div className={`absolute bottom-0 left-0 h-[2px] w-full transition-all duration-500 bg-linear-to-r from-blue-600 via-green-400 to-blue-600 opacity-60 ${isScrolled ? "scale-x-100" : "scale-x-0"
        }`} />

      <div className="flex h-12 md:h-14 px-4 md:px-6 w-full items-center justify-between lg:px-16 mx-auto">
        <div className="flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:scale-[1.02]">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.jpg"
              alt="Logo ServiStudy"
              width={300}
              height={300}
              priority
              className="h-10 w-auto md:h-12 lg:h-12 rounded-lg"
            />
          </Link>

          <Link href="/" className="flex items-center">
            <h1 className="text-blue-900 font-extrabold text-[18px] md:text-[22px] lg:text-[22px] tracking-tight">
              Servi<span className="text-blue-500 transition-colors duration-500">Study</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="text-sm font-bold text-blue-800 hover:bg-blue-50 transition-colors rounded-xl px-4">
            <Link href="/login">Iniciar sesión</Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="hidden sm:inline-flex bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all rounded-xl px-6 active:scale-95">
            <Link href="/registro">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
