"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RoleSwitch } from '@/components/shared/RoleSwitch'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HeaderLR } from "@/components/shared/HeaderLR"

type TipoUsuario = "estudiante" | "empresa"

const Page = () => {
    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("estudiante")

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        tyc: false
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const{name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        tyc: ''
    })
    
    {/*
    const [isOpen, setIsOpen] = useState(false)

    function handleModal() {
        let 
    }
    */}

    function validateForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const newErrors = {
            email: '',
            password: '',
            tyc: ''
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
        if(newErrors.email || newErrors.password || newErrors.tyc){
            return
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
            <HeaderLR/>
            <Card className="w-73.75 md:w-96 xl:w-100 p-4 mt-25">
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
                        setTipoUsuario={setTipoUsuario}
                    />

                    {tipoUsuario === "empresa" && (
                        <Button variant="outline" className="w-full items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
                            Iniciar con Google
                        </Button>
                    )}

                    {/* SEPARADOR */}
                    <div className="text-[12px] md:text-[14px] lg:text-sm text-gray-500 flex justify-center items-center gap-2">
                        <hr className=" border-primary w-10 border lg:w-16" />
                        o continuar con email
                        <hr className=" border-primary w-10 border lg:w-16"/>
                    </div>

                    {/* FORM */}
                    <form onSubmit={validateForm} className="space-y-1">
                        <label className="text-[12px] md:text-[14px] lg:text-sm font-medium text-gray-500 py-"> 
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

                        <label className="text-[12px] md:text-[14px] lg:text-sm font-medium text-gray-500 pt-5">
                            Contraseña
                            <Input className="text-[12px] md:text-[14px] lg:text-sm font-normal" placeholder="contraseña"
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <p className="text-[10px] text-red-700">{errors.password}</p>
                        </label>

                        {/* RECORDAR */}
                        <div className=" justify-between items-center text-[12px] md:text-[14px] lg:text-sm pt-1.5">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                name="tyc"
                                checked={formData.tyc}
                                onCheckedChange={(checked) => setFormData (prev => ({...prev, tyc: Boolean(checked)}))}
                                />
                                {tipoUsuario === "estudiante" 
                                    ? <a className=" hover:underline"> 
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button type="button" className="hover:underline">
                                                    Aceptar términos y condiciones
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-primary font-bold text-2xl">Términos y condiciones</DialogTitle>
                                                    <DialogDescription>Este modal contendrá los términos y condiciones del usuario al utilizar la plataforma</DialogDescription>
                                                </DialogHeader>
                                                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                                                    <p className="mb-4 leading-normal" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </a>
                                    : <a className=" hover:underline">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button type="button" className="hover:underline">
                                                    Declaración de representantes
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-green-700 font-bold text-2xl">Términos y condiciones</DialogTitle>
                                                    <DialogDescription>Este modal contendrá los términos y condiciones del usuario al utilizar la plataforma</DialogDescription>
                                                </DialogHeader>
                                                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                                                    <p className="mb-4 leading-normal" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        </a>
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