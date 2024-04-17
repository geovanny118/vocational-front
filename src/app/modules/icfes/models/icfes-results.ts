import { Materia } from "./materia";

export interface IcfesResult {
    nombreEstudiante: string;
    identificacionUsuario: string;
    registroExamen: string;
    fechaExamen: string;
    listaMaterias: Materia[];
    puntajeGlobal: number
}