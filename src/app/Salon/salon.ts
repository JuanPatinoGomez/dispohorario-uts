import { Edificio } from "../Edificio/edificio";

export interface Salon{
    id?: number;
    tipo?: string;
    numero?: number;
    edificio?: Edificio;
}