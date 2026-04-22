import Audience from "@/features/landing/components/Audience"
import Benefits from "@/features/landing/components/Benefits"
import { DOffers } from "@/features/landing/components/DOffers"
import { PricingSection } from "@/features/landing/components/PricingSection"
import { Button } from "@/components/ui/button"
import { AIFeatures } from "@/features/landing/components/IAFeatures"

export default function Home() {

  return (
    <div className="bg-gray-50 flex flex-col w-full items-center justify-center overflow-hidden">
      <div className="relative w-full lg:max-w-5xl md:max-w-2xl max-w-[calc(100%-2rem)] mx-4 bg-linear-to-br from-blue-500 to-green-500 my-10 rounded-3xl text-center p-8 md:p-16 flex flex-col items-center gap-8 shadow-2xl transition-all duration-700 hover:shadow-primary/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
            Donde tu carrera despega <br className="hidden md:block" />
            <span className="text-blue-100">antes de graduarte.</span>
          </h1>

          <p className="text-blue-50 text-base md:text-lg max-w-2xl font-medium leading-relaxed opacity-90">
            Conectamos a estudiantes talentosos con empresas líderes para
            trabajos de medio tiempo, prácticas y proyectos que impulsan tu futuro profesional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a href="/registro">
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 md:py-7 md:px-12 md:text-lg py-4 px-10 rounded-2xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                ¡Registrate Ya!
              </Button>
            </a>
          </div>
        </div>
      </div>
      <Benefits />
      <Audience />
      <DOffers />
      <PricingSection />
      <AIFeatures />
    </div>
  )
}