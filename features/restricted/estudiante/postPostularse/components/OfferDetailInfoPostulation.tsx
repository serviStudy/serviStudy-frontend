import { ActiveOffer } from "@/features/restricted/estudiante/ofertasActivas/types/ofertasActivas.types";
import { DollarSign, Clock, Calendar } from "lucide-react";

interface Props {
    offer: ActiveOffer;
}

export const OfferDetailInfoPostulation = ({ offer }: Props) => {
    const formatDays = (days: string[]) => {
        if (!days || days.length === 0) return "No especificado";
        if (days.length >= 5 && days.includes("MONDAY") && days.includes("FRIDAY")) return "Lunes a Viernes";
        if (days.length === 2 && days.includes("SATURDAY") && days.includes("SUNDAY")) return "Fines de semana";
        return days.length > 2 ? "Lunes a Viernes" : "Fines de semana";
    };

    const scheduleMap: Record<string, string> = {
        FULL_TIME: "Jornada Completa",
        PART_TIME: "Media Jornada",
        FLEXIBLE: "Flexible"
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-4 mt-6 mb-6">

            {/* Salario */}
            <div className="bg-green-50 rounded-2xl p-5 flex-1 min-w-[140px] border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500 p-2 rounded-xl">
                        <DollarSign size={18} className="text-white" strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-[11px] font-bold text-green-600 uppercase tracking-widest mb-1">Salario</p>
                <p className="text-gray-900 font-extrabold text-lg leading-tight">
                    ${offer.salary?.toLocaleString("es-CO")}
                </p>
            </div>

            {/* Jornada */}
            <div className="bg-orange-50 rounded-2xl p-5 flex-1 min-w-[140px] border border-orange-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-orange-500 p-2 rounded-xl">
                        <Clock size={18} className="text-white" strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-1">Tipo de Jornada</p>
                <p className="text-gray-900 font-extrabold text-lg leading-tight">
                    {scheduleMap[offer.workSchedule] ?? offer.workSchedule}
                </p>
            </div>

            {/* Días laborales */}
            <div className="bg-gray-50 rounded-2xl p-5 flex-1 min-w-[140px] border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#1a3683] p-2 rounded-xl">
                        <Calendar size={18} className="text-white" strokeWidth={2} />
                    </div>
                </div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Días Laborales</p>
                <p className="text-gray-900 font-extrabold text-lg leading-tight">
                    {formatDays(offer.workDays)}
                </p>
            </div>

        </div>
    );
};

export default OfferDetailInfoPostulation;
