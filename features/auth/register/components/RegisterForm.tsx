"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RoleSwitch } from '@/components/shared/RoleSwitch'
import RegisterModal from "./RegisterModal"
import { studentTerms } from "@/lib/terms/studentTerms"

interface RegisterFormProps {
    formData: any;
    errors: any;
    tipoUsuario: "estudiante" | "empresa";
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTipoUsuarioChange: (tipo: "estudiante" | "empresa") => void;
    handleCheckboxChange: (checked: boolean) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

export const RegisterForm = ({
    formData,
    errors,
    tipoUsuario,
    handleInputChange,
    handleTipoUsuarioChange,
    handleCheckboxChange,
    handleSubmit,
    loading
}: RegisterFormProps) => {
    return (
        <Card className={`w-full p-5 md:p-8 shadow-2xl mb-8 transition-all duration-500 ${
            tipoUsuario === "estudiante" ? "border-primary/10" : "border-green-600/20"
        }`}>
            <CardHeader className="space-y-1 p-0 pb-6">
                <CardTitle className={`text-center text-2xl md:text-3xl font-bold transition-colors duration-500 ${
                    tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                }`}>
                    Registrarse
                </CardTitle>

                <p className="text-center text-sm text-gray-500 font-medium">
                    Ingresa tus credenciales para acceder a tu cuenta.
                </p>
            </CardHeader>

            <CardContent className="space-y-5 p-0">
                {/* BOTONES ESTUDIANTE / EMPRESA */}
                <RoleSwitch
                    tipoUsuario={tipoUsuario}
                    setTipoUsuario={handleTipoUsuarioChange}
                />

                {tipoUsuario === "empresa" && (
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 font-semibold hover:bg-green-50 border-input transition-colors rounded-xl shadow-sm text-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continuar con Google
                    </Button>
                )}

                {/* SEPARADOR */}
                <div className="text-xs font-semibold text-gray-500 flex justify-center items-center gap-3 py-2 uppercase tracking-wider">
                    <hr className={`w-full border-t transition-colors duration-500 ${
                        tipoUsuario === "estudiante" ? "border-primary/20" : "border-green-600/20"
                    }`} />
                    <span className="whitespace-nowrap px-2">o continuar con email</span>
                    <hr className={`w-full border-t transition-colors duration-500 ${
                        tipoUsuario === "estudiante" ? "border-primary/20" : "border-green-600/20"
                    }`} />
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-2 text-sm font-bold text-gray-700 ml-1">
                            Correo electrónico
                            <Input className={`h-12 px-4 rounded-xl transition-all duration-500 focus-visible:ring-2 bg-muted/5 font-normal text-base ${
                                tipoUsuario === "estudiante" ? "focus-visible:ring-primary/20" : "focus-visible:ring-green-600/20"
                            }`}
                                placeholder={tipoUsuario === "estudiante" ? "ejemplo@.edu.co" : "ejemplo@gmail.com"}
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <p className="text-[12px] text-red-500 font-semibold ml-1">{errors.email}</p>
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-bold text-gray-700 ml-1">
                            Contraseña
                            <Input className={`h-12 px-4 rounded-xl transition-all duration-500 focus-visible:ring-2 bg-muted/5 font-normal text-base ${
                                tipoUsuario === "estudiante" ? "focus-visible:ring-primary/20" : "focus-visible:ring-green-600/20"
                            }`} 
                                placeholder="••••••••"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <p className="text-[12px] text-red-500 font-semibold ml-1">{errors.password}</p>
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-bold text-gray-700 ml-1">
                            Confirmar contraseña
                            <Input className={`h-12 px-4 rounded-xl transition-all duration-500 focus-visible:ring-2 bg-muted/5 font-normal text-base ${
                                tipoUsuario === "estudiante" ? "focus-visible:ring-primary/20" : "focus-visible:ring-green-600/20"
                            }`} 
                                placeholder="••••••••"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <p className="text-[12px] text-red-500 font-semibold ml-1">{errors.confirmPassword}</p>
                        </label>
                    </div>

                    {/* RECORDAR */}
                    <div className="flex flex-col gap-1.5 pt-1">
                        <div className="flex items-start gap-2.5 ml-1">
                            <Checkbox
                                name="tyc"
                                checked={formData.tyc}
                                onCheckedChange={handleCheckboxChange}
                                className={`mt-0.5 rounded-md h-5 w-5 transition-colors duration-500 ${
                                    tipoUsuario === "estudiante" ? "data-[state=checked]:bg-primary" : "data-[state=checked]:bg-green-600"
                                }`}
                            />
                            <div className="text-sm font-semibold text-gray-600 leading-tight">
                                {tipoUsuario === "estudiante"
                                    ?
                                    <RegisterModal
                                        tittle={"Términos y condiciones"}
                                        button={"Términos y condiciones"}
                                        description={"Términos y condiciones de la plataforma para el usuario estudiante"}
                                        paragraph={studentTerms}
                                        tittleColor="text-primary"
                                    />
                                    :
                                    <RegisterModal
                                        button={"Declaración de representante"}
                                        tittle={"Declaración de representante"}
                                        paragraph={studentTerms}
                                        description={"Términos y condiciones de la plataforma para el usuario empleador"}
                                        tittleColor="text-green-600"
                                    />
                                }
                            </div>
                        </div>
                        <p className="text-[12px] font-semibold text-red-500 ml-8">{errors.tyc}</p>
                    </div>

                    {/* BOTÓN LOGIN */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full h-12 text-lg font-bold rounded-xl transition-all duration-500 active:scale-[0.98] text-white shadow-lg mt-2 ${
                            tipoUsuario === "estudiante" 
                                ? "bg-primary hover:bg-primary/90 shadow-primary/20" 
                                : "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Procesando...
                            </span>
                        ) : "Registrarse Ahora"}
                    </Button>
                </form>

                {/* REGISTRO */}
                <div className="pt-4 text-center text-sm font-medium text-gray-500 border-t border-muted/20">
                    ¿Ya tienes cuenta?
                    <Link href="/login" className={`ml-2 cursor-pointer hover:underline transition-colors duration-500 font-extrabold ${
                        tipoUsuario === "estudiante" ? "text-primary" : "text-green-600"
                    }`}>
                        Inicia sesión
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
