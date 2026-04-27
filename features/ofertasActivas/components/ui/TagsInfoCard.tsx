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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className={`p-2 rounded-xl bg-${item.color}-100 text-${item.color}-600`}>
                        <item.icon size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-bold text-gray-700 truncate">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}