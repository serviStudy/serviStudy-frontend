"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useLogin } from "../hooks/useLogin"

export const LoginForm = () => {
    const {
        tipoUsuario,
        setTipoUsuario,
        correo,
        setCorreo,
        password,
        setPassword,
        errorCorreo,
        setErrorCorreo,
        loading,
        handleLogin
    } = useLogin()

    return (
        <Card className="w-100 p-4 shadow-lg border-primary/10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-3xl font-extrabold text-primary tracking-tight">
                    Bienvenido de nuevo
                </CardTitle>
                <p className="text-center text-sm text-muted-foreground font-medium">
                    Ingresa tus credenciales para acceder a tu cuenta.
                </p>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
                {/* TIPO DE USUARIO */}
                <div className="flex justify-center gap-2 bg-muted/30 p-1.5 rounded-xl border border-border w-fit mx-auto">
                    <Button
                        variant={tipoUsuario === "estudiante" ? "default" : "ghost"}
                        className={`rounded-lg transition-all duration-200 ${
                            tipoUsuario === "estudiante" 
                            ? "shadow-sm" 
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => {
                            setTipoUsuario("estudiante")
                            setErrorCorreo("")
                        }}
                    >
                        Estudiante
                    </Button>
                    <Button
                        variant={tipoUsuario === "empresa" ? "default" : "ghost"}
                        className={`rounded-lg transition-all duration-300 ${
                            tipoUsuario === "empresa" 
                            ? "bg-green-600 hover:bg-green-700 text-white shadow-sm" 
                            : "hover:bg-muted/50 text-muted-foreground"
                        }`}
                        onClick={() => {
                            setTipoUsuario("empresa")
                            setErrorCorreo("")
                        }}
                    >
                        Empresa
                    </Button>
                </div>

                {/* GOOGLE SOLO EMPRESA */}
                {tipoUsuario === "empresa" && (
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-11 font-semibold hover:bg-muted/50 border-input transition-colors rounded-xl">
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
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-muted-foreground/20"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-3 text-muted-foreground font-semibold">o continuar con email</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* EMAIL */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">
                            Correo electrónico
                        </label>
                        <Input
                            placeholder="nombre@universidad.edu"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className={`h-12 px-4 rounded-xl transition-all focus:ring-2 bg-muted/10 ${
                                errorCorreo ? "border-destructive ring-destructive/20" : "border-input focus:ring-primary/20"
                            }`}
                        />
                        {errorCorreo && (
                            <p className="text-destructive text-[13px] font-semibold mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
                                {errorCorreo}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-bold text-gray-700">
                                Contraseña
                            </label>
                            <Link href="#" className="text-[13px] text-primary hover:underline font-semibold transition-colors">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 px-4 rounded-xl focus:ring-2 focus:ring-primary/20 bg-muted/10 border-input transition-all"
                        />
                    </div>
                </div>

                {/* RECORDAR */}
                <div className="flex items-center space-x-2 ml-1">
                    <Checkbox id="remember" className="rounded-md h-5 w-5" />
                    <label htmlFor="remember" className="text-sm font-semibold text-gray-600 cursor-pointer select-none">
                        Recordarme en este dispositivo
                    </label>
                </div>

                {/* BOTÓN LOGIN */}
                <Button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full h-12 text-[16px] font-bold rounded-xl transition-all duration-200 active:scale-[0.98] mt-2 shadow-md ${
                        tipoUsuario === "empresa"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-primary hover:bg-primary/90 text-white"
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
                    ) : "Iniciar sesión"}
                </Button>

                {/* REGISTRO */}
                <div className="pt-2 text-center text-sm font-medium text-muted-foreground border-t border-muted/20">
                    ¿Aún no tienes cuenta?
                    <Link
                        href="/registro"
                        className="ml-1.5 font-bold hover:underline text-primary transition-all underline-offset-4"
                    >
                        Registrate gratis
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
