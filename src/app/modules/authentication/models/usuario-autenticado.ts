export interface UsuarioAutenticado {
    token: string;
    bearer: number;
    expirationToken: String;
    expirationTokenISO: Date;
    identificacion: string;
    authorities: string[];
}