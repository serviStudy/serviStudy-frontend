import { Building2, CircleDollarSign, MapPin, Briefcase } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'

interface MiniOfferProps {
  title?: string
  company?: string
  location?: string
  salary?: string
  tags?: string[]
}

export const MiniOffer = ({ 
  title = "Desarrollador Junior", 
  company = "Tech Solutions", 
  location = "Remoto", 
  salary = "2'500.000",
  tags = ["Flexible", "Prácticas"]
}: MiniOfferProps) => {
  return (
    <div className='group relative bg-white/80 backdrop-blur-md border border-white/50 w-full max-w-[320px] rounded-[1.5rem] p-5 flex flex-col gap-4 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/40 hover:-translate-y-2 overflow-hidden shadow-lg'>
        {/* CARD GLOW */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/50 rounded-full blur-2xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 shadow-sm">
                <Building2 size={24} />
            </div>
            <div className='flex-1 overflow-hidden'>
                <h3 className='text-blue-950 text-base font-black truncate leading-tight'>
                    {title}
                </h3>
                <p className='text-blue-600/80 text-xs font-bold flex items-center gap-1.5'>
                    <Briefcase size={12} /> {company}
                </p>
            </div>
        </div>

        <div className='space-y-3'>
            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1 text-[11px] font-bold text-gray-500'>
                    <MapPin className='w-4 h-4 text-emerald-500'/> 
                    {location}
                </div>
                <div className='flex items-center gap-1 text-[11px] font-bold text-blue-900'>
                    <CircleDollarSign className='w-4 h-4 text-blue-600'/> 
                    {salary}
                </div>
            </div>
            
            <div className='flex flex-wrap gap-2 pt-1'>
                {tags.map((tag, idx) => (
                    <Badge 
                        key={idx} 
                        variant="secondary" 
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-black tracking-wide border transition-colors ${
                            idx % 2 === 0 
                                ? 'bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white' 
                                : 'bg-green-50 text-green-600 border-green-100 group-hover:bg-green-600 group-hover:text-white'
                        }`}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    </div>
  )
}
