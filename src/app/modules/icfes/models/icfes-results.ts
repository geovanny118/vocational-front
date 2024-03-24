import { Materia } from "./materia";

export interface IcfesResult {
    nombreEstudfante: string;
    identificacionUsuario: string;
    registroExamen: string;
    fechaExamen: string;
    listaMaterias: Materia[];
    puntajeGlobal: number
}