import { SafeUrl } from "@angular/platform-browser";

export class Noticias{
    _id?:string;
    img?: string;
    titulo: string;
    tipo:string;
    imagen2?:SafeUrl;
    descripcion: string;
    estado?: boolean;
    fecha?:Date;
    constructor(img: string, titulo:string, descripcion:string, estado:boolean, tipo: string, archivo: File){
        this.titulo=titulo,
        this.descripcion=descripcion,
        this.img=img,
        this.tipo = tipo
        this.estado=estado
    }
}