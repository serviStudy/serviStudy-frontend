import React from 'react'
import { MiniOffer } from '../../../components/ui/MiniOffer'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MOCK_OFFERS = [
  { title: "Desarrollador React", company: "Globant", location: "Medellín", salary: "3'500.000", tags: ["Híbrido", "Junior"] },
  { title: "Diseñador UX/UI", company: "Bancolombia", location: "Remoto", salary: "2'800.000", tags: ["Flexible", "Prácticas"] },
  { title: "Data Analyst", company: "Rappi", location: "Bogotá", salary: "4'200.000", tags: ["Presencial", "Senior"] },
  { title: "Product Manager", company: "Mercado Libre", location: "Remoto", salary: "5'000.000", tags: ["Flexible", "Full-time"] },
  { title: "QA Engineer", company: "Accenture", location: "Medellín", salary: "3'000.000", tags: ["Híbrido", "Junior"] },
]

export const DOffers = () => {
  return (
    <section className="w-full py-24 px-6 flex flex-col items-center gap-16 bg-gray-50/30 relative overflow-hidden">
        {/* DECORATIVE BACKGROUND */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-[100px] -mr-48 -mt-48" />

        <div className="text-center space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">
                Ofertas <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-500">Destacadas</span>
            </h2>
            <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto opacity-80">
                Las mejores oportunidades seleccionadas especialmente para potenciar tu crecimiento.
            </p>
        </div>

        <div className="w-full max-w-6xl relative z-10 px-12">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {MOCK_OFFERS.map((offer, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <MiniOffer {...offer} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg" />
                <CarouselNext className="hidden md:flex -right-4 border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg" />
            </Carousel>
        </div>
    </section>
  )
}
