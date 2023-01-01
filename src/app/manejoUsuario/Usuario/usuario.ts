import { Byte } from "@angular/compiler/src/util";

export interface Usuario{
    id?: number;
    usuario?: string;
    contrasena?: Byte[];
    habilitado?: Boolean;
}