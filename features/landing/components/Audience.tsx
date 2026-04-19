import { Button } from "@/components/ui/button"
import { User, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Audience() {
  return (
    <section className="w-full py-16 px-6 flex flex-col items-center gap-12 bg-gray-50/50">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight">
          Diseñado para <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-500">toda</span> la comunidad
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto font-bold text-base">
          Ya seas un estudiante buscando su primera oportunidad o una empresa en busca de talento excepcional.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full">
        {/* ESTUDIANTES */}
        <div className="group relative bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center gap-8 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 overflow-hidden shadow-lg">
          {/* HERO-STYLE DECORATIVE GLOWS */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse transition-all group-hover:bg-white/30" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:rotate-12 border border-white/20 text-white shadow-xl">
            <User size={40} strokeWidth={1.5} className="drop-shadow-lg" />
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Futuros Profesionales</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              Para Estudiantes
            </h3>
            <p className="text-blue-50 text-base max-w-xs font-medium leading-relaxed opacity-90 italic">
              "Encuentra tu primer trabajo y construye un futuro que te apasione."
            </p>
          </div>

          <Link href="/registro" className="w-full mt-auto z-10">
            <Button variant="default" className="w-full bg-white text-blue-700 hover:bg-blue-50 h-14 rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group/btn border-none">
              ¡Quiero empezar!
              <ArrowRight size={22} className="transition-transform group-hover/btn:translate-x-2" />
            </Button>
          </Link>
        </div>

        {/* EMPLEADORES */}
        <div className="group relative bg-linear-to-br from-green-600 via-green-500 to-emerald-400 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center gap-8 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-2 overflow-hidden shadow-lg">
          {/* HERO-STYLE DECORATIVE GLOWS */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse transition-all group-hover:bg-white/30" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:-rotate-12 border border-white/20 text-white shadow-xl">
            <Building2 size={40} strokeWidth={1.5} className="drop-shadow-lg" />
          </div>

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-center gap-2 text-green-100">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Crecimiento Empresarial</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              Para Empleadores
            </h3>
            <p className="text-green-50 text-base max-w-xs font-medium leading-relaxed opacity-90 italic">
              "Descubre la energía del talento joven y lleva tu empresa al siguiente nivel."
            </p>
          </div>

          <Link href="/registro-empresa" className="w-full mt-auto z-10">
            <Button className="w-full bg-white text-green-700 hover:bg-green-50 h-14 rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group/btn border-none">
              Registrar Empresa
              <ArrowRight size={22} className="transition-transform group-hover/btn:translate-x-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
