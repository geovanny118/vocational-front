export interface User {
    idUsuario?: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    email: string;
    password?: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    roles: string[];
}