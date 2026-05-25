"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RoleSwitch } from '@/components/shared/RoleSwitch'
import RegisterModal from "./RegisterModal"
import { GoogleLogin } from "@react-oauth/google"
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
    handleGoogleSuccess: (credentialResponse: any) => void;
    handleGoogleError: () => void;
}

export const RegisterForm = ({
    formData,
    errors,
    tipoUsuario,
    handleInputChange,
    handleTipoUsuarioChange,
    handleCheckboxChange,
    handleSubmit,
    loading,
    handleGoogleSuccess,
    handleGoogleError
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
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="outline"
                            size="large"
                            width="320"
                            text="continue_with"
                        />
                    </div>
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
