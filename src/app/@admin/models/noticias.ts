export class Noticias{
    _id?:string;
    img?: string;
    titulo: string;
    descripcion: string;
    estado?: boolean;
    fecha?:Date;
    constructor(img: string, titulo:string, descripcion:string, estado:boolean, archivo: File){
        this.titulo=titulo,
        this.descripcion=descripcion,
        this.img=img,
        this.estado=estado
    }
}