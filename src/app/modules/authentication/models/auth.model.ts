export interface LoginCredentials {
  identificacion: string;
  password: string;
}

export interface Usuario {
  idUsuario?: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  password?: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

export interface UsuarioAutenticado {
  token: string;
  bearer: number;
  identificacion: string;
  authorities: string[];
}
