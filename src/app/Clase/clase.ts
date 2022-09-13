import { Salon } from "../Salon/salon";

export interface Clase{
    id?: number;
    nombreAsignatura?: string;
    dia?: string;
    horaInicio?: string;
    horaFinalizacion?: string;
    salon?: Salon;
}