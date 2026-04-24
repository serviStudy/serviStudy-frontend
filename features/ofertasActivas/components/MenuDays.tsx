import { Checkbox } from "@/components/ui/checkbox"
import React from 'react'

interface Props {
    onToggleDay: (day: string) => void;
    onToggleJornada: (jornada: string) => void
}

const MenuDays = ({onToggleDay, onToggleJornada}: Props) => {
    return (
        <div className=' w-72.5 h-86 hidden lg:sticky lg:top-28 rounded-[21px] bg-white border border-gray-300 lg:block'>
            <div className="px-6 py-4">
                <h2 className='text-primary font-bold lg:text-[22px]'>Filtros</h2>

                <div className="flex flex-col gap-4 pt-3">
                    <div className="flex flex-col items-start gap-2 pl-3">
                        <p className="lg:text-[18px] text-gray-500 font-semibold">Días laborales</p>

                        <div className="flex gap-3 items-center pl-3">
                            <Checkbox className="h-5 w-5 rounded-[5px]" onCheckedChange={() => onToggleDay("Entre semana")}/>
                            <label className="text-gray-500 lg:text-[14px]">Entre semana</label>
                        </div>

                        <div className="flex gap-3 items-center pl-3">
                            <Checkbox className="h-5 w-5 rounded-[5px]" onCheckedChange={() => onToggleDay("Fines de semana")}/>
                            <label className="text-gray-500 lg:text-[14px]">Fines de semana</label>
                        </div>

                        <div className="flex gap-3 items-center pl-3">
                            <Checkbox className="h-5 w-5 rounded-[5px]" onCheckedChange={() => onToggleDay("Específicos")}/>
                            <label className="text-gray-500 lg:text-[14px]">Específicos</label>
                        </div>
                    </div>

                    <hr className="h-0.5 bg-gray-200 rounded-2xl"/>

                    <div className="flex flex-col items-start gap-2 pl-3">
                        <p className="lg:text-[18px] text-gray-500 font-semibold">Jornada</p>

                        <div className="flex gap-3 items-center pl-3">
                            <Checkbox className="h-5 w-5 rounded-[5px]" onCheckedChange={() => onToggleJornada("Tiempo completo")}/>
                            <label className="text-gray-500 lg:text-[14px]">Tiempo completo</label>
                        </div>

                        <div className="flex gap-3 items-center pl-3">
                            <Checkbox className="h-5 w-5 rounded-[5px]" onCheckedChange={() => onToggleJornada("Medio tiempo")}/>
                            <label className="text-gray-500 lg:text-[14px]">Medio tiempo</label>
                        </div>

                        <div className="flex gap-3 items-center pl-3">
                            <Checkbox className="h-5 w-5 rounded-[5px]" onCheckedChange={() => onToggleJornada("flexible")}/>
                            <label className="text-gray-500 lg:text-[14px]">Flexible</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MenuDays