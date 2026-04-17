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
    <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between mt-8">
      {/* Tarjeta Salario */}
      <div className="bg-[#F5F5F5] rounded-xl p-4 flex-1 min-w-[150px]">
        <div className="flex items-center gap-2 text-green-600 mb-1">
          <div className="p-1 border border-green-600 rounded-full">
            <DollarSign size={16} strokeWidth={3} />
          </div>
          <span className="font-bold text-sm">Salario</span>
        </div>
        <p className="text-gray-700 font-bold ml-1">
          $ {offer.salary.toLocaleString("es-CO")}
        </p>
      </div>

      {/* Tarjeta Jornada */}
      <div className="bg-[#F5F5F5] rounded-xl p-4 flex-1 min-w-[150px]">
        <div className="flex items-center gap-2 text-orange-500 mb-1">
          <Clock size={18} strokeWidth={2.5} />
          <span className="font-bold text-sm">Jornada</span>
        </div>
        <p className="text-gray-700 font-bold ml-1">
          {scheduleMap[offer.work_schedule || (offer as any).workSchedule] || "Flexible"}
        </p>
      </div>

      {/* Tarjeta Días laborales */}
      <div className="bg-[#F5F5F5] rounded-xl p-4 flex-1 min-w-[150px]">
        <div className="flex items-center gap-2 text-[#1a3683] mb-1">
          <Calendar size={18} strokeWidth={2.5} />
          <span className="font-bold text-sm">Días laborales</span>
        </div>
        <p className="text-gray-700 font-bold ml-1">
          {formatDays(offer.work_days || (offer as any).workDays)}
        </p>
      </div>
    </div>
  );
};
