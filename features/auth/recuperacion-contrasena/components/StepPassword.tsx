import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const StepPassword = ({
    tipoUsuario,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    loading, handleChangePassword
}: any) => {
    return (
        <Card className={`w-full max-w-md mx-auto p-5 md:p-6 shadow-2xl transition-all duration-500 ${
            tipoUsuario === "estudiante" ? "border-primary/10" : "border-green-600/20"
        }`}>
            <CardHeader className="space-y-4 p-0 pb-6 pt-2">
                <CardTitle className={`text-center text-2xl md:text-3xl font-extrabold transition-colors duration-500 ${
                    tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                }`}>
                    Nueva Contraseña
                </CardTitle>
                <p className="text-center text-sm text-gray-500 font-medium px-4">
                    Crea una contraseña segura para proteger tu cuenta.
                </p>
            </CardHeader>

            <CardContent className="space-y-5 p-0">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">
                            Contraseña
                        </label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`h-12 px-4 rounded-xl transition-all duration-500 focus-visible:ring-2 bg-muted/5 font-normal text-base ${
                                tipoUsuario === "estudiante" 
                                    ? "border-input focus-visible:ring-primary/20" 
                                    : "border-input focus-visible:ring-green-600/20"
                            }`}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">
                            Confirmar contraseña
                        </label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`h-12 px-4 rounded-xl transition-all duration-500 focus-visible:ring-2 bg-muted/5 font-normal text-base ${
                                tipoUsuario === "estudiante" 
                                    ? "border-input focus-visible:ring-primary/20" 
                                    : "border-input focus-visible:ring-green-600/20"
                            }`}
                        />
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    <Button
                        onClick={handleChangePassword}
                        disabled={loading || !password || password !== confirmPassword}
                        className={`w-full h-12 text-lg font-bold rounded-xl transition-all duration-500 active:scale-[0.98] shadow-lg text-white ${
                            tipoUsuario === "estudiante"
                                ? "bg-primary hover:bg-primary/90 shadow-primary/20"
                                : "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                        }`}
                    >
                        {loading ? "Actualizando..." : "Cambiar contraseña"}
                    </Button>

                    <div className="text-center pt-2">
                        <Link
                            href="/login"
                            className={`text-sm font-bold hover:underline transition-all duration-500 ${
                                tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                            }`}
                        >
                            Volver al inicio de sesion
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
