import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const StepCode = ({
    tipoUsuario, correo,
    codigo, setCodigo,
    loading, handleVerifyCode,
    handleResendCode,
    error,
}: any) => {
    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newCode = [...codigo];
        newCode[index] = value;
        setCodigo(newCode);

        // Auto-focus next input
        if (value !== "" && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            if (nextInput) nextInput.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !codigo[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            if (prevInput) prevInput.focus()
        }
    }

    return (
        <Card className={`w-full max-w-md mx-auto p-5 md:p-6 shadow-2xl transition-all duration-500 ${
            tipoUsuario === "estudiante" ? "border-primary/10" : "border-green-600/20"
        }`}>
            <CardHeader className="space-y-4 p-0 pb-8 pt-2">
                <CardTitle className={`text-center text-2xl md:text-3xl font-extrabold transition-colors duration-500 ${
                    tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                }`}>
                    Verifica tu identidad
                </CardTitle>
                <p className="text-center text-sm text-gray-500 font-medium px-4">
                    Hemos enviado un código de 6 dígitos a<br />{correo || "ejemplo@gmail.com"}
                </p>
            </CardHeader>

            <CardContent className="space-y-8 p-0">
                <div className="flex justify-center gap-2 md:gap-3">
                    {codigo.map((digit: string, index: number) => (
                        <div key={index} className="relative">
                            <Input
                                id={`code-${index}`}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`w-[45px] h-[45px] md:w-12 md:h-12 p-0 text-center text-xl font-bold rounded-lg transition-all duration-500 bg-muted/20 border-2 shadow-inner text-gray-700 ${
                                    error
                                        ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                                        : tipoUsuario === "estudiante"
                                            ? "focus-visible:border-primary focus-visible:ring-primary/20"
                                            : "focus-visible:border-green-600 focus-visible:ring-green-600/20"
                                }`}
                            />
                            {!digit && (
                                <span className={`absolute inset-0 flex items-center justify-center pointer-events-none text-2xl font-black ${
                                    tipoUsuario === "estudiante" ? "text-primary/10" : "text-green-600/10"
                                }`}>
                                    *
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {error && (
                    <p className="text-center text-sm font-semibold text-red-500 -mt-4">
                        {error}
                    </p>
                )}

                <div className="space-y-4">
                    <Button
                        onClick={handleVerifyCode}
                        disabled={loading || codigo.some((d: string) => d === "")}
                        className={`w-full h-12 text-lg font-bold rounded-xl transition-all duration-500 active:scale-[0.98] shadow-lg text-white ${
                            tipoUsuario === "estudiante"
                                ? "bg-primary hover:bg-primary/90 shadow-primary/20"
                                : "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                        }`}
                    >
                        {loading ? "Verificando..." : "Verificar código"}
                    </Button>

                    <div className="flex justify-center gap-2 text-sm font-medium pt-2">
                        <span className="text-gray-500">¿No recibiste el código?</span>
                        <button
                            onClick={handleResendCode}
                            disabled={loading}
                            className={`font-bold hover:underline transition-colors disabled:opacity-50 ${
                                tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                            }`}
                        >
                            {loading ? "Enviando..." : "Reintentar"}
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
