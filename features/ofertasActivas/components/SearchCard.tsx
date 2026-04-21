import { Button } from '@/components/ui/button'
import { routes } from '@/type/routes';
import { BriefcaseBusiness, Search } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

interface Props {
    inputValue: string;
    onInputChange: (value: string) => void
    onSearch: () => void
}

const SearchCard = ({ inputValue, onInputChange, onSearch }: Props) => {
    return (
        <div className='flex w-full flex-col md:gap-4'>
            <div className='py-1 h-auto w-[85vw] lg:w-full lg:h-44 rounded-[21px]  md:bg-white'>
                
                <div className='flex flex-col py-3 gap-4 items-center w-full lg:gap-6'>
                    <div className='hidden md:block space-x-0'>
                        <h2 className='md:-mb-1 lg:mb-0 text-primary font-bold text-[20px] md:text-[26px] lg:text-[32px] text-center'>Encuentra nuevas ofertas</h2>
                        <p className='text-gray-500 hidden text-center text-[13px] md:block md:text-[14px] lg:text-[15px]'>Explora cientos de oportunidades para estudiante</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className="relative">
                            <input 
                                value={inputValue}
                                onChange={(e) => onInputChange(e.target.value)}
                                onKeyDown={(e) => {if (e.key === "Enter") onSearch()}}
                                className='lg:w-64 md:w-90 w-[80vw] h-7 md:h-8 flex justify-center bg-white text-gray-500 text-[14px] md:text-gray-400 lg:h-9 pr-12 pl-4 border rounded-full'
                                placeholder='Puesto o palabra clave'
                            />
                            <button 
                                className='absolute rounded-full lg:h-7 h-5 right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1'>
                                <Search className='w-3 h-3 lg:w-4 lg:h-4' strokeWidth={2}/>
                            </button>
                        </div>

                        <Link className='lg:bg-primary lg:w-full lg:px-6 lg:rounded-full lg:font-semibold lg:h-9 lg:block hidden' href={routes.estudiante.postulaciones}>
                            Mis postulaciones
                        </Link>
                    </div>
                </div>
            </div>

            <Button className='flex gap-2 md:w-50 w-40 text-[13px] h-6.5 items-center rounded-2xl lg:hidden'>
                <BriefcaseBusiness className='w-3.5! h-3.5!'/>
                <p className=''>Mis postulaciones</p>
            </Button>
        </div>
    )
}

export default SearchCard