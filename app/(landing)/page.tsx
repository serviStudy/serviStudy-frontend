import Audience from "@/components/landing/Audience"
import Benefits from "@/components/landing/Benefits"
import { DOffers } from "@/components/landing/DOffers"
import { PricingSection } from "@/components/landing/PricingSection"
import { Button } from "@/components/ui/button"
import { AIFeatures } from "@/components/landing/IAFeatures"

export default function Home() {

  return (
    <div className="bg-gray-200 flex flex-col w-full items-center justify-center ">
      <div className="w-full max-w-6xl mx-10 bg-[#C2DDFF] my-10 rounded-2xl text-center p-8 md:p-12 flex flex-col items-center gap-6">
        
        <h1 className="text-3xl md:text-5xl font-bold text-blue-800 leading-tight">
          Donde tu carrera despega antes de graduarte.
        </h1>

        <p className="text-gray-600 text-sm md:text-base max-w-xl">
          Conectamos a estudiantes talentosos con empresas líderes para
          trabajos de medio tiempo, prácticas y proyectos que impulsan tu futuro.
        </p>

        <a href="/registro">

          <Button variant="azul">Registrate Ya</Button>

        </a>
      </div>
      <Benefits/>
      <Audience/>
      <DOffers/>
      <PricingSection/>
      <AIFeatures/>
    </div>
  )
}