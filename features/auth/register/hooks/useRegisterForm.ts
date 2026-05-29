import { useState, useEffect } from "react";
import { validateRegisterForm } from "../utils/registerValidator";
import { registerUser } from "@/features/auth/register/service/register";
import { TipoUsuario } from "@/type/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePersistentRole } from "@/hooks/usePersistentRole";
import { loginWithGoogle } from "@/features/auth/login/service/login.service";
import { decodeJwt } from "jose";
export function useRegisterForm() {
    const router = useRouter();
    const { tipoUsuario, setTipoUsuario } = usePersistentRole();

    // Auto-login si el token está activo y "remember me" está habilitado
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedRemember = localStorage.getItem("remember_me") === "true";
            if (savedRemember) {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const decoded = decodeJwt(token);
                        const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;
                        if (!isExpired) {
                            // Asegurar que la cookie esté presente para SSR
                            document.cookie = `token=${token}; path=/; SameSite=Lax; max-age=2592000`;
                            const role = decoded.role || localStorage.getItem("remembered_role") || localStorage.getItem("user_role");
                            if (role) {
                                const normalizedRole = (role as string).toUpperCase();
                                if (normalizedRole === "STUDENT" || role === "estudiante") {
                                    window.location.href = "/estudiante/perfil";
                                } else {
                                    window.location.href = "/empleador/perfil";
                                }
                            }
                        }
                    } catch (e) {
                        console.error("Error al procesar el token para auto-login:", e);
                    }
                }
            }
        }
    }, []);

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

    const [loading, setLoading] = useState(false);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleCheckboxChange(checked: boolean) {
        setFormData(prev => ({
            ...prev,
            tyc: checked
        }))
    }

    function handleTipoUsuarioChange(tipo: TipoUsuario) {
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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newErrors = validateRegisterForm(formData, tipoUsuario);
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(err => err !== "");
        if (hasErrors) return;

        setLoading(true);
        try {
            await registerUser({
                email: formData.email,
                password: formData.password,
            },
                tipoUsuario
            );

            toast.success("Usuario registrado")

            router.push(`/verificar?email=${formData.email}&role=${tipoUsuario}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);

            if (error.status === 409) {
                toast.error("El correo ya está registrado");
            } else if (error.status === 500) {
                toast.error("Error interno del servidor");
            } else {
                toast.error(error.message || "Error desconocido");
            }
        } finally {
            setLoading(false);
        }
    }

    const processLoginData = (data: any) => {
        if (!data.data) {
            throw new Error("Respuesta del servidor inválida: falta el objeto 'data'")
        }

        const token = data.data.token;
        document.cookie = `token=${token}; path=/; SameSite=Lax`
        localStorage.setItem("token", token)

        let email = formData.email;
        let role = tipoUsuario;

        try {
            const decoded = decodeJwt(token);
            if (decoded.sub) email = decoded.sub;
            if (decoded.role) role = decoded.role as TipoUsuario;
        } catch (e) {
            console.error("Error decodificando JWT:", e);
        }

        localStorage.setItem("user_email", email)
        localStorage.setItem("user_role", role)

        // El backend envía "STUDENT" o "EMPLOYER" en el JWT
        const normalizedRole = (role as string).toUpperCase()
        if (normalizedRole === "STUDENT" || role === "estudiante") {
            window.location.href = "/estudiante/perfil"
        } else {
            window.location.href = "/empleador/perfil"
        }
    }

    const handleGoogleSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential;
        if (!idToken) {
            toast.error("No se recibió token de Google");
            return;
        }
        setLoading(true);
        try {
            const data = await loginWithGoogle(idToken);
            processLoginData(data);
            toast.success("Registro exitoso con Google");
        } catch (error: any) {
            console.error("Error Google Login:", error.message);
            toast.error(error.message || "No se pudo registrar con Google");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        toast.error("No se pudo iniciar sesión con Google");
    };

    return {
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
    };
}