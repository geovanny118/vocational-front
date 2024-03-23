export interface UsuarioAutenticado {
    token: string;
    bearer: number;
    identificacion: string;
    authorities: string[];
}