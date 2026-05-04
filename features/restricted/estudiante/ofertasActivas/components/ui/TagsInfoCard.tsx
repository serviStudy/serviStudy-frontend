import { Calendar, CircleDollarSign, Clock } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/restricted/estudiante/postPostularse/types/offer';
import { ConvertWorkDayTags } from '../../hooks/ConvertWorkDayTags';
import { ConvertJornadaTags } from '../../hooks/ConvertJornadaTags';

interface TagsCardProps {
    offer: Offer;
}

export const TagsInfoCard = ({ offer }: TagsCardProps) => {
    if (!offer) return null
    
    const dayTags = ConvertWorkDayTags(offer.workDays)
    const jornadaTags = ConvertJornadaTags(offer.workSchedule)

    const infoItems = [
        { 
            icon: Clock, 
            label: 'TIPO DE JORNADA', 
            value: jornadaTags, 
            bgColor: 'bg-[#fff7ed]', 
            iconBg: 'bg-[#f97316]',
            textColor: 'text-[#c2410c]'
        },
        { 
            icon: Calendar, 
            label: 'DÍAS LABORALES', 
            value: dayTags.join(", "), 
            bgColor: 'bg-[#f8fafc]', 
            iconBg: 'bg-[#1e293b]',
            textColor: 'text-[#334155]'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {infoItems.map((item, idx) => (
                <div key={idx} className={`flex flex-col gap-3 p-4 rounded-xl border border-gray-100 ${item.bgColor} shadow-sm transition-all hover:scale-[1.02]`}>
                    <div className={`p-2 rounded-xl ${item.iconBg} text-white shadow-md w-fit`}>
                        <item.icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <p className={`text-xs font-medium uppercase tracking-widest ${item.textColor} opacity-80`}>{item.label}</p>
                        <p className={`text-sm md:text-base font-semibold ${item.textColor} tracking-tight leading-tight mt-1`}>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}