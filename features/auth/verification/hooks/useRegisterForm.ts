import { useState } from "react";
import { validateRegisterForm } from "../../../../app/(auth)/registro/registerValidator";
import { registerUser } from "@/lib/api/register";
import { TipoUsuario } from "@/type/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useRegisterForm(){
    const router = useRouter();

    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("estudiante");

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

    function handleCheckboxChange(checked:boolean) {
        setFormData(prev =>({
            ...prev,
            tyc: checked
        }))
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

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newErrors = validateRegisterForm(formData, tipoUsuario);
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(err => err !== "");
        if(hasErrors) return;

        try{
            await registerUser({
                email: formData.email,
                password: formData.password,
            },
            tipoUsuario
        );

        toast.success("Usuario registrado")
        
        router.push(`/verificar?email=${formData.email}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch (error: any){
            toast.error(error.message);

            if (error.status === 409) {
                toast.error("El correo ya está registrado");
            } else if (error.status === 500) {
                toast.error("Error interno del servidor");
            } else {
                toast.error(error.message || "Error desconocido");
            }
        }
    }

    return {
        formData,
        errors,
        tipoUsuario,
        handleInputChange,
        handleTipoUsuarioChange,
        handleCheckboxChange,
        handleSubmit
    };
}