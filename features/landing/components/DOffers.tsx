import React from 'react'
import { MiniOffer } from '../../../components/ui/MiniOffer'

export const DOffers = () => {
  return (
    <section className="w-full py-16 px-6  flex flex-col items-center">
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-10 text-center">
                Ofertas Destacadas
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl text-center">
            Encuentra tu primer trabajo, gana experiencia y construye tu futuro profesional.
          </p>
        </div>
        <div className="p-10 flex flex-wrap mt-10 justify-evenly rounded-2xl gap-5 md:grid-cols-3 w-full max-w-3xl bg-gray-300">
            <MiniOffer/> 
            <MiniOffer/>
            <MiniOffer/>
            <MiniOffer/>
        </div>
    </section>
  )
}
