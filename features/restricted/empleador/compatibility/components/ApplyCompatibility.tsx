"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { runCompatibilityAnalysis } from "../service/compatibilityService";

interface Props {
  offerId: string;
  selectedIds: string[];
  onAnalisysComplete: (daya: any) => void
}

export const ApplyCompatibility = ({ offerId, selectedIds, onAnalisysComplete }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const count = selectedIds.length;

  const handleRunCompatibility = async () => {
    if (count === 0) {
      toast.error("Selecciona al menos un postulante para continuar.");
      return;
    }

    try {
      setLoading(true);
      console.log("[ApplyCompatibility] Running analysis with:", {
        offerId,
        selectedIds
      });

      // se guarda la respuesta de la compatibilidad
      const responseData = await runCompatibilityAnalysis({
        jobOfferId: offerId,
        ids: selectedIds
      });
            console.log("🕵️‍♂️ RESPUESTA EXACTA DE LA IA:", responseData);

      toast.success("Compatibilidad realizada con éxito.");

      // se pasa el resultado de la compatibilidad usando la prop
      onAnalisysComplete(responseData.data)
      
      // Redirigir a la página de resultados
    } catch (error: any) {
      toast.error(error.message || "Error al procesar la compatibilidad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      {/* Action Button */}
      <Button 
        onClick={handleRunCompatibility}
        disabled={loading || count === 0}
        className={`flex gap-2 py-2 px-6 rounded-xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer
          ${count > 0 
            ? "bg-linear-to-r from-green-500 to-blue-500 text-white hover:shadow-green-500/20" 
            : "bg-linear-to-r from-green-400 to-blue-400 text-white"
          }`}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Sparkles size={18} />
        )}
        {loading ? "Procesando..." : "Realizar compatibilidad"}
      </Button>
    </div>
  );
};
