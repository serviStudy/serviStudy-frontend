import { Building2, CircleDollarSign, MapPin } from 'lucide-react'
import React from 'react'

export const MiniOffer = () => {
  return (
    <div className='bg-white w-75 h-30 rounded-2xl flex flex-row items-center '>
        <div className="w-19 h-19 rounded-xl ml-4 flex items-center justify-center bg-gray-400">
            <Building2 className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className='ml-2'>
            <h1 className='text-blue-700 text-[14px] font-bold'>
                nombre
            </h1>
            <p className='text-blue-700 text-[10px] font-bold'>
                descripciòn
            </p>
            <div className='flex flex-row gap-3'>
                <p className='flex items-center text-[12px] text-[#009232]'><MapPin className='w-3 h-3'/> ubicacion</p>
                <p className='flex items-center text-[12px] text-blue-700'><CircleDollarSign className='w-3 h-3'/> 120.000</p>
            </div>
            <div className='flex flex-row gap-4'>
                <p className='flex items-center text-[12px] px-2 rounded-2xl bg-[#FFD9B2] text-[#BE6105] border-[#FF8000] border'>Flexible</p>
                <p className='flex items-center text-[12px] px-2 rounded-2xl bg-[#C9FFC8] text-[#009232] border-[#009232] border'>Flexible</p>
            </div>
        </div>
    </div>
  )
}
