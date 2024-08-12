import { CardsUniversidades } from './cards-universidades';

export interface University {
    cardsUniversidades: CardsUniversidades[];
    respuestaBackUp?: University;
    categorias: string;
    test: string;
    cantidadUniversidades: number;
    status: false;
}