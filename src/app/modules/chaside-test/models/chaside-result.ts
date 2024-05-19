import { CardsUniversidades } from './cards-universidades';

export interface ChasideResult {
    cardsUniversidades?: CardsUniversidades[] | null;
    respuestaBackUp?: string | null;
    categorias: string;
    test: string;
    cantidadUniversidades: number;
    status: boolean;
}