import { JobOfferDTO } from "../../types/jobOffer.types";
import { DollarSign, Clock, Calendar } from "lucide-react";

interface Props {
  offer: JobOfferDTO;
}

export const OfferDetailInfoCards = ({ offer }: Props) => {
  const scheduleMap: Record<string, string> = {
    FULL_TIME: "Jornada Completa",
    PART_TIME: "Media Jornada",
    FLEXIBLE: "Flexible",
  };

  const workDays = offer.work_days || (offer as any).workDays || [];
  const workSchedule = offer.work_schedule || (offer as any).workSchedule;
  const daysLabel = workDays.length > 2 ? "Lunes a Viernes" : "Fines de semana";

  const cards = [
    {
      icon: DollarSign,
      label: "Salario",
      value: `$${Number(offer.salary).toLocaleString("es-CO")}`,
      accent: "green",
      bg: "bg-green-50",
      border: "border-green-100",
      iconBg: "bg-green-600",
      text: "text-green-600",
    },
    {
      icon: Clock,
      label: "Tipo de Jornada",
      value: scheduleMap[workSchedule] || "Flexible",
      accent: "orange",
      bg: "bg-orange-50",
      border: "border-orange-100",
      iconBg: "bg-orange-500",
      text: "text-orange-500",
    },
    {
      icon: Calendar,
      label: "Días Laborales",
      value: daysLabel,
      accent: "gray",
      bg: "bg-gray-50",
      border: "border-gray-100",
      iconBg: "bg-gray-800",
      text: "text-gray-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} ${card.border} border rounded-[32px] p-8 flex flex-col gap-4 shadow-sm hover:-translate-y-1 transition-transform duration-300`}
        >
          <div className={`w-14 h-14 ${card.iconBg} rounded-[20px] flex items-center justify-center text-white shadow-lg`}>
            <card.icon size={26} strokeWidth={2.5} />
          </div>
          <div>
            <p className={`text-[11px] font-black uppercase tracking-widest ${card.text} mb-2`}>
              {card.label}
            </p>
            <p className="text-gray-900 font-black text-2xl tracking-tighter leading-none">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
