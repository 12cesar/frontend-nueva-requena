export class Mensaje{
    _id?:string;
    correo?:string;
    fecha?:Date;
    mensaje: string;
    nombre: string;

    constructor(mensaje:string, nombre:string, correo: string){
        this.nombre=nombre;
        this.mensaje = mensaje;
        this.correo =correo;
    }


}