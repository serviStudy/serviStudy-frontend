import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RoleSwitch } from "@/components/shared/RoleSwitch"

export const StepEmail = ({
    tipoUsuario, setTipoUsuario,
    correo, setCorreo,
    loading, handleSendEmail
}: any) => {
    return (
        <Card className={`w-full max-w-md mx-auto p-5 md:p-6 shadow-2xl transition-all duration-500 ${
            tipoUsuario === "estudiante" ? "border-primary/10" : "border-green-600/20"
        }`}>
            <CardHeader className="space-y-4 p-0 pb-6 pt-2">
                <CardTitle className={`text-center text-2xl md:text-3xl font-extrabold transition-colors duration-500 ${
                    tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                }`}>
                    ¿Olvidaste tu<br />contraseña?
                </CardTitle>
                <p className="text-center text-sm text-gray-500 font-medium px-4">
                    No te preocupes, nos pasa a todos. Introduce tu email y te enviaremos un enlace de recuperación.
                </p>
            </CardHeader>

            <CardContent className="space-y-5 p-0">
                <RoleSwitch 
                    tipoUsuario={tipoUsuario} 
                    setTipoUsuario={setTipoUsuario} 
                />

                <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">
                            Correo electrónico
                        </label>
                        <Input
                            placeholder="ejemplo@gmail.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className={`h-12 px-4 rounded-xl transition-all duration-500 focus-visible:ring-2 bg-muted/5 font-normal text-base ${
                                tipoUsuario === "estudiante" 
                                    ? "border-input focus-visible:ring-primary/20" 
                                    : "border-input focus-visible:ring-green-600/20"
                            }`}
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        onClick={handleSendEmail}
                        disabled={loading || !correo}
                        className={`w-full h-12 text-lg font-bold rounded-xl transition-all duration-500 active:scale-[0.98] shadow-lg text-white ${
                            tipoUsuario === "estudiante"
                                ? "bg-primary hover:bg-primary/90 shadow-primary/20"
                                : "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                        }`}
                    >
                        {loading ? "Enviando..." : "Enviar correo"}
                    </Button>
                </div>

                <div className="pt-4 text-center">
                    <Link
                        href="/login"
                        className={`text-sm font-bold hover:underline transition-all duration-500 ${
                            tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                        }`}
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
