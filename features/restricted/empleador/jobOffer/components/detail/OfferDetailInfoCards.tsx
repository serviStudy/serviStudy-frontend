import { JobOfferDTO } from "../../types/jobOffer.types";
import { DollarSign, Clock, Calendar, FileText } from "lucide-react";

interface Props {
  offer: JobOfferDTO;
}

export const OfferDetailInfoCards = ({ offer }: Props) => {
  const formatDays = (days: string[]) => {
    if (!days || days.length === 0) return "No especificado";
    if (days.length >= 5 && days.includes("MONDAY") && days.includes("FRIDAY")) return "Lunes a Viernes";
    if (days.length === 2 && days.includes("SATURDAY") && days.includes("SUNDAY")) return "Fines de semana";
    return days.length > 2 ? "Lunes a Viernes" : "Fines de semana";
  };

  const scheduleMap: Record<string, string> = {
    FULL_TIME: "Tiempo Completo",
    PART_TIME: "Medio tiempo",
    FLEXIBLE: "Flexible",
  };

  const workDays = offer.work_days || (offer as any).workDays || [];
  const workSchedule = offer.work_schedule || (offer as any).workSchedule;

  return (
    <div className="flex flex-col mt-6">
      {/* Salario */}
      <div className="bg-green-50 rounded-t-xl p-5 flex flex-col min-w-35 border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-500 p-2 rounded-xl">
            <DollarSign size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-green-600">Salario</p>
        </div>
        <p className="text-gray-600 leading-tight text-[17px] font-medium">
          ${Number(offer.salary).toLocaleString("es-CO")}
        </p>
      </div>

      {/* Jornada */}
      <div className="bg-green-50 p-5 flex flex-col min-w-35 border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-orange-500 p-2 rounded-xl">
            <Clock size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-orange-600">Tipo de Jornada</p>
          </div>
        </div>
        <p className="text-gray-600 font-semibold text-[17px] leading-tight">
          {scheduleMap[workSchedule] || workSchedule || "Flexible"}
        </p>
      </div>

      {/* Días laborales */}
      <div className="bg-green-50 p-5 flex flex-col min-w-35 border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-700 p-2 rounded-xl">
            <Calendar size={18} className="text-white" strokeWidth={2} />
          </div>
          <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-green-700">Días Laborales</p>
        </div>
        <p className="text-gray-600 font-semibold text-[17px] leading-tight">
          {formatDays(workDays)}
        </p>
      </div>

      {/* Detalles de contratación */}
      <div className="bg-green-50 p-5 flex flex-col min-w-35 border rounded-b-xl border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gray-700 p-2 rounded-xl">
            <FileText size={18} className="text-white" strokeWidth={2} />
          </div>
          <p className="font-semibold text-lg capitalize tracking-wider mb-1 text-gray-600">Detalles de contratación</p>
        </div>
        <p className="text-gray-600 font-semibold text-[17px] leading-tight whitespace-pre-line">
          {offer.contract_description || (offer as any).contractDescription || "No especificado"}
        </p>
      </div>
    </div>
  );
};
