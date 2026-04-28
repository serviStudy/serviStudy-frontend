import { CircleDollarSign, MapPin, CalendarDays, ArrowUpRight, Clock } from 'lucide-react'
import React from 'react'
import { ApplicationItem } from '../types/applicationTypes'
import Image from "next/image";
import Link from 'next/link';
import { ApplyButtonDelete } from '../hooks/ApplyButtonDelete';

interface Props {
    data: ApplicationItem;
    onDelete: (jobOfferId: string) => void;
}

// Limpia el texto de la descripción quitando el bloque |||CONTRACT...
const cleanDescription = (raw: string): string => {
    return raw.split('|||')[0].trim();
};

export const Postulacion = ({ data, onDelete }: Props) => {
    const description = cleanDescription(data.jobOffer.description);

    return (
        <div className='w-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow'>

            {/* Franja superior de color */}
            <div className='h-1.5 w-full bg-linear-to-r from-[#2552d0] to-blue-400' />

            <div className='flex gap-5 p-6'>

                {/* Imagen */}
                <div className='shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200'>
                    <Image
                        width={80}
                        height={80}
                        src={data.jobOffer.imageUrl || "/placeholder-job.png"}
                        alt={data.jobOffer.title}
                        className='object-cover w-full h-full'
                    />
                </div>

                {/* Contenido principal */}
                <div className='flex flex-col gap-2.5 flex-1 min-w-0'>

                    {/* Fila: título + chip de fecha */}
                    <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                            <h4 className='text-gray-900 font-bold text-lg leading-tight truncate'>
                                {data.jobOffer.title}
                            </h4>
                            <p className='text-[#2552d0] text-sm font-semibold mt-0.5'>
                                {data.jobOffer.businessName}
                            </p>
                        </div>
                        <span className='shrink-0 flex items-center gap-1.5 text-[11px] text-[#2552d0] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full font-semibold'>
                            <CalendarDays className='h-3 w-3' />
                            {data.applicationDate}
                        </span>
                    </div>

                    {/* Chips: dirección (azul) y salario (naranja) */}
                    <div className='flex flex-wrap gap-2.5'>
                        <span className='flex items-center gap-1.5 text-xs text-[#2552d0] bg-blue-50 px-3 py-1.5 rounded-xl font-medium border border-blue-100'>
                            <MapPin className='h-3.5 w-3.5 shrink-0' />
                            {data.jobOffer.establishmentAddress}
                        </span>
                        <span className='flex items-center gap-1.5 text-xs text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl font-medium border border-orange-100'>
                            <CircleDollarSign className='h-3.5 w-3.5 shrink-0' />
                            {data.jobOffer.salary}
                        </span>
                    </div>

                    {/* Descripción limpia */}
                    {description && (
                        <p className='text-gray-500 text-sm leading-relaxed line-clamp-2'>
                            {description}
                        </p>
                    )}


                    <div className='flex items-center justify-between'>
                        {/* Detalles de contratación */}
                        {data.jobOffer.salaryDescription && (
                            <div className='flex items-center gap-2 w-2/5 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100'>
                                <Clock className='h-3.5 w-3.5 text-[#2552d0] shrink-0' />
                                <div>
                                    <span className='text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Detalles de contratación · </span>
                                    <span className='text-xs text-gray-600'>{data.jobOffer.salaryDescription}</span>
                                </div>
                            </div>
                        )}

                        {/* Acciones */}
                        <div className='flex items-center justify-end gap-3 pt-1'>
                            <ApplyButtonDelete jobOfferId={data.jobOffer.jobOfferId} onDelete={onDelete} />
                            <Link
                                href={`/estudiante/postulacion/${data.jobOffer.jobOfferId}`}
                                className='flex items-center gap-2 bg-[#2552d0] hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all shadow-sm shadow-blue-900/20'
                            >
                                Ver oferta
                                <ArrowUpRight className='h-4 w-4' />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}