import { Button } from "@/components/ui/button"
import { User, Building2 } from "lucide-react"
import Link from "next/link"

export default function Audience() {
  return (
    <section className="w-full py-16 px-6 flex justify-center">
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl w-full">

        {/* Estudiantes */}
        <div className="bg-[#C2DDFF] border border-blue-300 rounded-xl p-8 flex flex-col items-center text-center gap-4">
          <User className="text-blue-700" size={36} />

          <h3 className="text-lg font-semibold text-blue-800">
            Para Estudiantes
          </h3>

          <p className="text-gray-600 text-sm max-w-sm">
            Encuentra tu primer trabajo, gana experiencia y construye tu futuro profesional.
          </p>

          <Link href="/registro">
            <Button variant="azul" >
              Crea tu perfil
            </Button>
          </Link>
        </div>

        {/* Empleadores */}
        <div className="bg-green-100 border border-green-300 rounded-xl p-8 flex flex-col items-center text-center gap-4">
          <Building2 className="text-green-700" size={36} />

          <h3 className="text-lg font-semibold text-green-800">
            Para empleadores
          </h3>

          <p className="text-gray-600 text-sm max-w-sm">
            Descubre y contrata al mejor talento joven y motivado para tu equipo.
          </p>

          <Link href="/registro-empresa">
            <Button className="bg-green-600 hover:bg-green-700">
              Registra tu Empresa
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}
