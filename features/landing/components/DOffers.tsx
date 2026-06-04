"use client"
import React from 'react'
import { MiniOffer } from '../../../components/ui/MiniOffer'
import { usePersistentRole } from "@/hooks/usePersistentRole"
import { motion } from "framer-motion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const MOCK_OFFERS = [
    { title: "Paseador de perros", company: "PasaPerros", location: "Bogotá", salary: "18.000 COP", tags: ["Medio Tiempo", "Presencial"] },
    { title: "Repartidor", company: "iFood", location: "Bogotá", salary: "18.000 COP", tags: ["Flexible", "Prácticas"] },
    { title: "Asistente Administrativo", company: "Bancolombia", location: "Remoto", salary: "4'200.000", tags: ["Presencial", "Senior"] },
    { title: "Cocinero", any: "Mercado Libre", location: "Remoto", salary: "5'000.000", tags: ["Flexible", "Full-time"] },
    { title: "Mesero", company: "Accenture", location: "Medellín", salary: "3'000.000", tags: ["Híbrido", "Junior"] },
]

export const DOffers = () => {
    const { tipoUsuario } = usePersistentRole()
    const isEstudiante = tipoUsuario === "estudiante"

    return (
        <section className="w-full py-24 px-6 flex flex-col items-center gap-16 bg-gray-50/30 relative overflow-hidden">
            {/* DECORATIVE BACKGROUND */}
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -mr-48 -mt-48 transition-colors duration-1000 ${
                isEstudiante ? "bg-blue-100/25" : "bg-green-100/25"
            }`} />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4 relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">
                    Ofertas <span className={`text-transparent bg-clip-text bg-linear-to-r transition-all duration-1000 ${
                        isEstudiante ? "from-blue-600 to-blue-400" : "from-green-600 to-green-400"
                    }`}>Destacadas</span>
                </h2>
                <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto opacity-80">
                    Las mejores oportunidades seleccionadas especialmente para potenciar tu crecimiento.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl relative z-10 px-12"
            >
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
                    <CarouselPrevious className={`hidden md:flex -left-4 transition-all shadow-lg border hover:text-white ${
                        isEstudiante 
                            ? "border-blue-100 text-blue-600 hover:bg-blue-600" 
                            : "border-green-100 text-green-600 hover:bg-green-600"
                    }`} />
                    <CarouselNext className={`hidden md:flex -right-4 transition-all shadow-lg border hover:text-white ${
                        isEstudiante 
                            ? "border-blue-100 text-blue-600 hover:bg-blue-600" 
                            : "border-green-100 text-green-600 hover:bg-green-600"
                    }`} />
                </Carousel>
            </motion.div>
        </section>
    )
}
