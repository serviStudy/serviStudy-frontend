"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RoleSwitch } from '@/components/shared/RoleSwitch'
import RegisterModal from "@/components/auth/RegisterModal"
import { studentTerms } from "@/lib/terms/studentTerms"
import { HeaderLR } from "@/components/shared/HeaderLR"

type TipoUsuario = "estudiante" | "empresa"

const Page = () => {
    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("estudiante")

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        tyc: false
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        tyc: ''
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const{name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    async function validateForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: '',
            tyc: ''
        }

        if(formData.confirmPassword !== formData.password){
            newErrors.confirmPassword = "Las contraseñas deben concidir"
        }

        if(tipoUsuario === "estudiante"){
            if(!formData.email.endsWith('.edu.co')){
                newErrors.email = "El correo debe ser institucional (.edu)"
            }
            if(formData.password.length < 8){
                newErrors.password = "La contraseña debe tener mínimo 8 caracteres"
            }
            if(!formData.tyc){
                newErrors.tyc = "Debe aceptar términos y condiciones"
            }
        }else{
            if(formData.password.length < 8){
                newErrors.password = "La contraseña debe tener mínimo 8 caracteres"
            }
            if(!formData.tyc){
                newErrors.tyc = "Debe aceptar declaración de representante"
            }
        }
        setErrors(newErrors)
        if(newErrors.email || newErrors.password || newErrors.confirmPassword || newErrors.tyc){
            return
        }
    }

    function handleTipoUsuarioChange(tipo: TipoUsuario){
        setTipoUsuario(tipo)

        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            tyc: false
        })

        setErrors({
            email: '',
            password: '',
            confirmPassword: '',
            tyc: ''
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <HeaderLR/>
            <Card className="w-73.75 md:w-96 xl:w-100 p-4">
                <CardHeader>
                    <CardTitle className="text-center text-[24px] lg:text-2xl font-bold text-primary">
                        Registrarse
                    </CardTitle>

                    <p className="text-center text-[12px] md:text-[14px] lg:text-sm text-gray-500">
                        Ingresa tus credenciales para acceder a tu cuenta.
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* BOTONES ESTUDIANTE / EMPRESA */}
                    <RoleSwitch
                        tipoUsuario={tipoUsuario}
                        setTipoUsuario={handleTipoUsuarioChange}
                    />

                    {tipoUsuario === "empresa" && (
                        <Button variant="outline" className="w-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
                            Iniciar con Google
                        </Button>
                    )}

                    {/* SEPARADOR */}
                    <div className="text-[12px] md:text-[14px] lg:text-sm text-gray-500 flex justify-center items-center gap-2">
                        <hr className= { tipoUsuario === "estudiante"
                            ? "border-primary w-10 border lg:w-16"
                            : "border-green-600 w-10 border lg:w-16"}/>
                        o continuar con email
                        <hr className= { tipoUsuario === "estudiante"
                            ? "border-primary w-10 border lg:w-16"
                            : "border-green-600 w-10 border lg:w-16"}/>
                    </div>

                    {/* FORM */}
                    <form onSubmit={validateForm} className="space-y-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] md:text-[14px] lg:text-sm font-medium text-gray-500"> 
                                Correo eletrónico
                                <Input className="text-[12px] md:text-[14px] lg:text-sm font-normal" 
                                    placeholder={tipoUsuario === "estudiante" ? "ejemplo@.edu.co" : "ejemplo@gmail.com"}
                                    type="text" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <p className="text-[10px] text-red-700">{errors.email}</p>
                            </label>

                            <label className="text-[12px] md:text-[14px] lg:text-sm font-medium text-gray-500">
                                Contraseña
                                <Input className="text-[12px] md:text-[14px] lg:text-sm font-normal" placeholder="contraseña"
                                    type="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <p className="text-[10px] text-red-700">{errors.password}</p>
                            </label>

                            <label className="text-[12px] md:text-[14px] lg:text-sm font-medium text-gray-500">
                                Confirmar contraseña
                                <Input className="text-[12px] md:text-[14px] lg:text-sm font-normal" placeholder="confirma tu contraseña"
                                    type="password" 
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <p className="text-[10px] text-red-700">{errors.confirmPassword}</p>
                            </label>
                        </div>

                        {/* RECORDAR */}
                        <div className=" justify-between items-center text-[12px] md:text-[14px] lg:text-sm pt-1.5">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                name="tyc"
                                checked={formData.tyc}
                                onCheckedChange={(checked) => setFormData (prev => ({...prev, tyc: Boolean(checked)}))}
                                />
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
                                        tittleColor="text-green-700"
                                    />
                                }
                            </div>
                            <p className="text-[10px] px-6 font-medium text-red-700">{errors.tyc}</p>
                        </div>

                        {/* BOTÓN LOGIN */}
                        <Button
                            type="submit"
                            className={`w-full  ${
                            tipoUsuario === "empresa"
                                ? "bg-green-600 hover:bg-green-700 text-white text-[16px] md:text-[14px] lg:text-[19px] mt-2"
                                : "text-[16px] md:text-[14px] lg:text-[19px] mt-2"
                            }`}
                            >
                        Registrarse
                        </Button>
                </form>

                {/* REGISTRO */}
                <p className="text-center text-[12px] md:text-[14px] lg:text-sm text-gray-500">
                    ¿Ya tienes cuenta?
                    <Link href="/login" className="ml-1 cursor-pointer hover:underline text-primary">
                    Inicia sesión
                    </Link>
                </p>
            </CardContent>
        </Card>
    </div>
    )
}
export default Page