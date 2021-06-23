export class Categorias{
    _id?: number | string;
    nombre: string;
    estado?: boolean;

    constructor(nombre: string, estado: boolean){
        this.nombre = nombre;
        this.estado = estado
    }
}