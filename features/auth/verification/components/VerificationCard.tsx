import { Button } from "@/components/ui/button";
import { CodeInput } from "./CodeInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Props {
  email: string | null;
  code: string[];
  onChange: (value: string, index: number) => void;
  onVerify: () => void;
  tipoUsuario?: "estudiante" | "empresa";
}

export const VerificationCard = ({
  email,
  code,
  onChange,
  onVerify,
  tipoUsuario = "estudiante",
}: Props) => {
  return (
    <Card className={`w-full max-w-md mx-auto p-5 md:p-8 shadow-2xl transition-all duration-500 rounded-3xl ${
        tipoUsuario === "estudiante" ? "border-primary/10" : "border-green-600/20"
    }`}>
      <CardHeader className="space-y-1 p-0 pb-8 text-center">
        <CardTitle className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${
            tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
        }`}>
          Verifica tu identidad
        </CardTitle>
        <p className="text-sm text-gray-500 font-medium max-w-[280px] mx-auto">
          Hemos enviado un código de 6 dígitos a <span className="font-bold text-gray-700">{email}</span>
        </p>
      </CardHeader>

      <CardContent className="space-y-8 p-0">
        <div className="flex justify-center py-2">
          <CodeInput code={code} onChange={onChange} />
        </div>

        <div className="space-y-4">
          <Button 
            onClick={onVerify}
            className={`w-full h-12 text-lg font-bold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg text-white ${
                tipoUsuario === "estudiante"
                    ? "bg-primary hover:bg-primary/90 shadow-primary/20"
                    : "bg-green-600 hover:bg-green-700 shadow-green-600/20"
            }`}
          >
            Verificar código
          </Button>

          <div className="text-center space-y-3">
            <p className={`text-sm font-bold cursor-pointer transition-colors duration-300 ${
              tipoUsuario === "estudiante" ? "text-primary hover:text-primary/80" : "text-green-600 hover:text-green-700"
            }`}>
              ¿No recibiste el código? Reintentar
            </p>

            <div className="pt-4 border-t border-muted/20">
              <Link
                href="/login"
                className={`text-sm font-extrabold hover:underline transition-all duration-300 underline-offset-4 ${
                  tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                }`}
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};