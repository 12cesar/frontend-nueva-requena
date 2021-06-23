export class Areas{
    _id?:string;
    archivo?: File;
    img?: string;
    nombre: string;
    descripcion: string;
    estado?: boolean;

    constructor(img: string, nombre:string, descripcion:string, estado:boolean, archivo: File){
        this.nombre=nombre,
        this.descripcion=descripcion,
        this.img=img,
        this.estado=estado,
        this.archivo = archivo
    }
}