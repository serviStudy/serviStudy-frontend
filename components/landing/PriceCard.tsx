import { Briefcase, Check, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PriceCardProps {
  type: "student" | "employer";
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
  const baseColors =
    type === "student"
      ? "bg-white text-slate-900 border-slate-200"
      : "bg-white text-slate-900 border-slate-200";

  const recommendedColors =
    type === "student"
      ? "bg-blue-600 text-white border-blue-700"
      : "bg-green-600 text-white border-green-700";

  const cardColors = isRecommended ? recommendedColors : baseColors;

  const TypeIcon = type === "student" ? User : Briefcase;

  return (
    <Card
      className={cn(
        "relative flex flex-col h-full rounded-3xl p-6 shadow-xl border overflow-hidden",
        cardColors,
        className
      )}
     >
      {isRecommended && (
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-md">
          RECOMENDADO
        </div>
      )}

      <CardHeader className="p-0 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isRecommended ? "bg-white/10" : "bg-slate-100"
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

      <CardContent className="grow p-0">
        <ul className="space-y-4 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5",
                  isRecommended
                    ? "bg-white/20 text-white"
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