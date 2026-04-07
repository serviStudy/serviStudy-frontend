import { RegisterErrors, RegisterFormData, TipoUsuario } from "@/type/auth";

export function validateRegisterForm(
    formData: RegisterFormData,
    tipoUsuario: TipoUsuario
    ): RegisterErrors{
    const errors: RegisterErrors = {
        email: '',
        password: '',
        confirmPassword: '',
        tyc: ''
    };

    if(formData.confirmPassword !== formData.password){
        errors.confirmPassword = "Las contraseñas deben concidir"
    }

    if(formData.password.length < 8){
        errors.password = "La contraseña debe tener mínimo 8 caracteres"
    }

    if(!formData.tyc){
        errors.tyc =
        tipoUsuario === "estudiante"
        ? "Debe aceptar los términos"
        : "Debe aceptar la declaración";
    }

    if(tipoUsuario === "estudiante" && !formData.email.endsWith(".edu.co")){
        errors.email = "Correo institucional requerido";
    }
    return errors;
}