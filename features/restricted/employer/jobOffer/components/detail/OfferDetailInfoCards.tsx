import { JobOfferDTO } from "../../types/jobOffer.types";
import { DollarSign, Clock, Calendar } from "lucide-react";

interface Props {
  offer: JobOfferDTO;
}

export const OfferDetailInfoCards = ({ offer }: Props) => {
  // Configuración de los días para mostrar
  const formatDays = (days: string[]) => {
    // Aquí puedes añadir la lógica para mapear a "Fines de semana" o "Lunes a Viernes"
    // Pero por la imagen la idea es poner algo representativo
    return days.length > 2 ? "Lunes a Viernes" : "Fines de semana"; 
  };

  const scheduleMap: Record<string, string> = {
    FULL_TIME: "Tiempo Completo",
    PART_TIME: "Medio Tiempo",
    FLEXIBLE: "Flexible"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
      {/* Tarjeta Salario */}
      <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(52,199,89,0.1)] hover:-translate-y-1 transition-transform group">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <div className="p-1.5 bg-green-50 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
            <DollarSign size={18} strokeWidth={3} />
          </div>
          <span className="font-bold text-sm uppercase tracking-wide text-green-700/80">Salario</span>
        </div>
        <p className="text-gray-800 font-extrabold text-[22px] ml-1 pt-1">
          $ {offer.salary.toLocaleString("es-CO")}
        </p>
      </div>

      {/* Tarjeta Jornada */}
      <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(249,115,22,0.1)] hover:-translate-y-1 transition-transform group">
        <div className="flex items-center gap-2 text-orange-500 mb-2">
          <div className="p-1.5 bg-orange-50 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <Clock size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm uppercase tracking-wide text-orange-600/80">Jornada</span>
        </div>
        <p className="text-gray-800 font-extrabold text-[22px] ml-1 pt-1">
          {scheduleMap[offer.work_schedule || (offer as any).workSchedule] || "Flexible"}
        </p>
      </div>

      {/* Tarjeta Días laborales */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(26,75,158,0.1)] hover:-translate-y-1 transition-transform group">
        <div className="flex items-center gap-2 text-[#1a4b9e] mb-2">
          <div className="p-1.5 bg-blue-50 text-[#1a4b9e] rounded-full group-hover:bg-[#1a4b9e] group-hover:text-white transition-colors">
            <Calendar size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm uppercase tracking-wide text-[#1a4b9e]/80">Días laborales</span>
        </div>
        <p className="text-gray-800 font-extrabold text-[22px] ml-1 pt-1">
          {formatDays(offer.work_days || (offer as any).workDays)}
        </p>
      </div>
    </div>
  );
};
