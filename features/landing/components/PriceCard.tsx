import { Briefcase, Check, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PriceCardProps {
  type: "estudiante" | "empresa";
  tier: string;
  price: string;
  term: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
  ctaText: string;
  className?: string;
}

export function PriceCard({
  type,
  tier,
  price,
  term,
  description,
  features,
  isRecommended = false,
  className,
}: PriceCardProps) {
  // Configuración de colores basada en el tipo de plan y si es recomendado
  const baseColors = "bg-white text-slate-900 border-slate-200";

  const recommendedColors =
    type === "estudiante"
      ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white border-blue-500 shadow-blue-200/50"
      : "bg-gradient-to-br from-green-600 to-green-400 text-white border-green-500 shadow-green-200/50";

  const cardColors = isRecommended ? recommendedColors : baseColors;

  const TypeIcon = type === "estudiante" ? User : Briefcase;

  return (
    <Card
      className={cn(
        "relative flex flex-col h-full rounded-3xl p-6 shadow-xl border transition-all duration-300",
        isRecommended && "hover:scale-[1.02]",
        cardColors,
        className
      )}
    >
      {isRecommended && (
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-3 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-md z-10">
          RECOMENDADO
        </div>
      )}

      <CardHeader className="p-0 pb-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isRecommended ? "bg-white/20 backdrop-blur-sm" : "bg-slate-100"
            )}
          >
            <TypeIcon
              className={cn(
                "h-5 w-5",
                isRecommended ? "text-white" : "text-slate-500"
              )}
            />
          </div>
          <p className="font-semibold">{tier}</p>
        </div>
        <div className="mb-2">
          <span className="text-4xl font-extrabold tracking-tight">${price}</span>
          <span className="text-xl font-medium opacity-80"> / {term}</span>
        </div>
        <p className="text-sm opacity-90">{description}</p>
      </CardHeader>

      <CardContent className="grow p-0 relative z-10">
        <ul className="space-y-4 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                  isRecommended
                    ? "bg-white/30 text-white"
                    : "bg-green-100 text-green-600"
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="flex-1 leading-normal opacity-90">{feature}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}