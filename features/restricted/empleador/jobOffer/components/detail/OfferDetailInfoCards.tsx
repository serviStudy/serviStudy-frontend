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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-6">
      {/* Salario */}
      <div className="bg-green-50/50 rounded-2xl p-5 flex flex-col border border-green-100/80 shadow-xs hover:shadow-sm transition-all">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="bg-green-500 p-2 rounded-xl text-white">
            <DollarSign size={18} strokeWidth={2.5} />
          </div>
          <p className="font-bold text-xs uppercase tracking-wider text-green-600">Salario</p>
        </div>
        <p className="text-gray-800 font-extrabold text-xl tracking-tight mt-1">
          ${Number(offer.salary).toLocaleString("es-CO")}
        </p>
      </div>

      {/* Jornada */}
      <div className="bg-orange-50/40 rounded-2xl p-5 flex flex-col border border-orange-100/60 shadow-xs hover:shadow-sm transition-all">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="bg-orange-500 p-2 rounded-xl text-white">
            <Clock size={18} strokeWidth={2.5} />
          </div>
          <p className="font-bold text-xs uppercase tracking-wider text-orange-600">Tipo de Jornada</p>
        </div>
        <p className="text-gray-800 font-bold text-[17px] leading-tight mt-1">
          {scheduleMap[workSchedule] || workSchedule || "Flexible"}
        </p>
      </div>

      {/* Días laborales */}
      <div className="bg-emerald-50/40 rounded-2xl p-5 flex flex-col border border-emerald-100/60 shadow-xs hover:shadow-sm transition-all">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="bg-emerald-600 p-2 rounded-xl text-white">
            <Calendar size={18} strokeWidth={2} />
          </div>
          <p className="font-bold text-xs uppercase tracking-wider text-emerald-700">Días Laborales</p>
        </div>
        <p className="text-gray-800 font-bold text-[17px] leading-tight mt-1">
          {formatDays(workDays)}
        </p>
      </div>

      {/* Detalles de contratación */}
      <div className="bg-slate-50/50 rounded-2xl p-5 flex flex-col border border-slate-200/60 shadow-xs hover:shadow-sm transition-all sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="bg-slate-700 p-2 rounded-xl text-white">
            <FileText size={18} strokeWidth={2} />
          </div>
          <p className="font-bold text-xs uppercase tracking-wider text-slate-600">Detalles de contratación</p>
        </div>
        <p className="text-gray-700 font-medium text-sm leading-relaxed mt-1 whitespace-pre-line">
          {offer.contract_description || (offer as any).contractDescription || "No especificado"}
        </p>
      </div>
    </div>
  );
};
