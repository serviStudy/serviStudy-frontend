import { Button } from "@/components/ui/button";
import { HeaderLR } from "@/components/shared/HeaderLR";
import { CodeInput } from "./CodeInput";

interface Props {
  email: string | null;
  code: string[];
  onChange: (value: string, index: number) => void;
  onVerify: () => void;
}

export const VerificationCard = ({
  email,
  code,
  onChange,
  onVerify,
}: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 pt-24">
      <HeaderLR />

      <div className="bg-white w-full max-w-sm rounded-[14px] p-8 text-center flex flex-col gap-6 shadow-2xl border border-primary/10">
        <h1 className="text-2xl font-bold text-blue-700">
          Verifica tu identidad
        </h1>

        <p className="text-gray-500 text-sm">
          Hemos enviado un código de 6 dígitos a {email}
        </p>

        <CodeInput code={code} onChange={onChange} />

        <Button onClick={onVerify}>
          Verificar código
        </Button>

        <p className="text-sm text-blue-600 cursor-pointer">
          ¿No recibiste el código? Reintentar
        </p>

        <a
          href="/login"
          className="text-blue-700 text-sm font-medium"
        >
          Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
};