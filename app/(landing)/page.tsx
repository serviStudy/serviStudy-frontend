import Audience from "@/features/landing/components/Audience"
import Benefits from "@/features/landing/components/Benefits"
import { DOffers } from "@/features/landing/components/DOffers"
import { PricingSection } from "@/features/landing/components/PricingSection"
import { Button } from "@/components/ui/button"
import { AIFeatures } from "@/features/landing/components/IAFeatures"

export default function Home() {

  return (
    <div className="bg-gray-200 flex flex-col w-full items-center justify-center ">
      <div className="w-full lg:max-w-5xl md:max-w-2xl max-w-full mx-10 bg-[#C2DDFF] my-10 sm:rounded-2xl text-center p-8 md:p-12 flex flex-col items-center gap-6">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-800 leading-tight">
          Donde tu carrera despega antes de graduarte.
        </h1>

        <p className="text-gray-600 text-sm md:text-base max-w-xl">
          Conectamos a estudiantes talentosos con empresas líderes para
          trabajos de medio tiempo, prácticas y proyectos que impulsan tu futuro.
        </p>

        <a href="/registro">

          <Button variant="azul" className="md:py-5 md:px-11 md:text-[17px] py-3 px-8">Registrate Ya</Button>

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