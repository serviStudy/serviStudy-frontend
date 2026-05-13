"use client";

import React from "react";
import { CheckCircle2, Calendar, Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscriptionDetail } from "../services/subscriptionService";
import { cn } from "@/lib/utils";

interface ActiveSubscriptionCardProps {
  subscription: SubscriptionDetail;
  type: "estudiante" | "empresa";
}

export function ActiveSubscriptionCard({ subscription, type }: ActiveSubscriptionCardProps) {
  const isEstudiante = type === "estudiante";
  const plan = subscription.plan;
  
  // Formatear fechas
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const daysLeft = Math.ceil(
    (new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className={cn(
      "w-full max-w-2xl mx-auto overflow-hidden border-none shadow-2xl rounded-3xl",
      isEstudiante 
        ? "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" 
        : "bg-gradient-to-br from-green-600 via-green-500 to-teal-600"
    )}>
      <CardHeader className="text-white p-8 pb-4">
        <div className="flex justify-between items-start mb-4">
          <Badge className="bg-white/20 text-white border-none backdrop-blur-md px-4 py-1 text-sm font-semibold">
            Suscripción Activa
          </Badge>
          <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
          </div>
        </div>
        <CardTitle className="text-4xl font-extrabold tracking-tight mb-2">
          {plan.name}
        </CardTitle>
        <CardDescription className="text-white/80 text-lg font-medium">
          {plan.description || "Disfrutando de todos los beneficios premium."}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 text-white/70 mb-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Válido hasta
            </div>
            <div className="text-white text-xl font-bold">
              {formatDate(subscription.endDate)}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 text-white/70 mb-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Tiempo restante
            </div>
            <div className="text-white text-xl font-bold flex items-baseline gap-1">
              {daysLeft} <span className="text-sm font-normal opacity-70">días</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg">Beneficios incluidos:</h4>
          <ul className="grid grid-cols-1 gap-3">
            {[
              "Acceso completo a herramientas de IA",
              "Mayor visibilidad en la plataforma",
              "Soporte prioritario",
              isEstudiante ? "Postulaciones destacadas" : "Búsqueda avanzada de candidatos"
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="h-5 w-5 text-white/50" />
                <span className="font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center">
          <p className="text-white/60 text-sm mb-4">
            Tu suscripción se renovará automáticamente o expirará según tu método de pago.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
