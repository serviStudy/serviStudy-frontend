import { ActiveOffer } from "@/features/restricted/estudiante/ofertasActivas/types/ofertasActivas.types";
import { DollarSign, Clock, Calendar, FileText } from "lucide-react";

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
        FULL_TIME: "Tiempo Completo",
        PART_TIME: "Medio tiempo",
        FLEXIBLE: "Flexible"
    };

    return (
        <div className="flex flex-col mt-6">

            {/* Salario */}
            <div className="bg-blue-50 rounded-t-xl p-5 flex flex-col min-w-35 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500 p-2 rounded-xl">
                        <DollarSign size={18} className="text-white" strokeWidth={2.5} />
                    </div>
                        <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-green-600">Salario</p>
                </div>
                <p className="text-gray-600 leading-tight text-[17px] font-medium">
                    ${offer.salary?.toLocaleString("es-CO")}
                </p>
            </div>

            {/* Jornada */}
            <div className="bg-blue-50 p-5 flex flex-col min-w-35 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-orange-500 p-2 rounded-xl">
                        <Clock size={18} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-orange-600">Tipo de Jornada</p>
                    </div>
                </div>
                <p className="text-gray-600 font-semibold text-[17px] leading-tight">
                    {scheduleMap[offer.workSchedule] ?? offer.workSchedule}
                </p>
            </div>

            {/* Días laborales */}
            <div className="bg-blue-50 p-5 flex flex-col min-w-35 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-700 p-2 rounded-xl">
                        <Calendar size={18} className="text-white" strokeWidth={2} />
                    </div>
                    <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-blue-600">Días Laborales</p>
                </div>
                <p className="text-gray-600 font-semibold text-[17px] leading-tight">
                    {formatDays(offer.workDays)}
                </p>
            </div>

            {/* Días laborales */}
            <div className="bg-blue-50 p-5 flex flex-col min-w-35 border rounded-b-xl  border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-gray-700 p-2 rounded-xl">
                        <FileText size={18} className="text-white" strokeWidth={2} />
                    </div>
                    <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-gray-600">Detalles de contratación</p>
                </div>
                <p className="text-gray-600 font-semibold text-[17px] leading-tight">
                    {offer.salaryDescription}
                </p>
            </div>

        </div>
    );
};

export default OfferDetailInfoPostulation;
