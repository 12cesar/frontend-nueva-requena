export class Historias{

    _id?:string;
    titulo:string;
    mensaje:string;
    img?:string;

    constructor(titulo:string, mensaje:string){
        this.titulo =titulo;
        this.mensaje = mensaje;
    }

}