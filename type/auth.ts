export type TipoUsuario = "estudiante" | "empresa";

export type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    tyc: boolean
};

export type RegisterErrors = {
    email:string;
    password: string;
    confirmPassword: string;
    tyc: string
};

