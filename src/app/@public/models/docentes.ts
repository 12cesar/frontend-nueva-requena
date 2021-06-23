export class Docentes {
    _id?: string;
    nombre: string;
    apellido: string;
    estado?: string;
    img?: string;
    area: {
        _id: string,
        nombre: string
    };
    categoria:{
        _id: string,
        nombre: string
    };
    descripcion: string;
    constructor(nombre: string, apellido: string, descripcion: string, area:{
        _id: string,
        nombre: string
    }, categoria:{
        _id: string,
        nombre: string
    }) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.descripcion = descripcion,
            this.area = area
            this.categoria = categoria
    }
}