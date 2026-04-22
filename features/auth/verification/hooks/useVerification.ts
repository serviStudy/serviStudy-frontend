import { useState } from "react";
import { toast } from "sonner";
import { validateVerificationCode } from "../sevice/verification.service";

export const useVerification = (email: string | null) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
  };

  const handleVerify = async () => {
    try {
      const finalCode = code.join("");
      await validateVerificationCode(email!, finalCode);

      toast.success("Cuenta verificada");
      window.location.href = "/login";
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error en la verificación");
      }
    }
  };

  return {
    code,
    handleChange,
    handleVerify,
  };
};