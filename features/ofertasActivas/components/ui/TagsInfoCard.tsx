import { Calendar, CircleDollarSign, Clock, MapPin } from 'lucide-react'
import React from 'react'
import { Offer } from '@/features/postPostularse/types/offer';
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
        { icon: CircleDollarSign, label: 'Salario', value: offer.salary, color: 'blue' },
        { icon: MapPin, label: 'Dirección', value: offer.address, color: 'emerald' },
        { icon: Clock, label: 'Jornada', value: jornadaTags, color: 'amber' },
        { icon: Calendar, label: 'Días laborales', value: dayTags.join(", "), color: 'green' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-[20px] bg-gray-50/50 border border-gray-100 hover:shadow-sm hover:border-gray-200 transition-all duration-300">
                    <div className={`p-2.5 rounded-xl bg-white text-${item.color}-600 shadow-sm border border-gray-100/80`}>
                        <item.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-extrabold text-gray-800 truncate">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}