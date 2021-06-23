export class Usuario {
    estado: string;
    nombre: string;
    rol: string;
    _id?: string;
    img?: string;
    usuario: string;
    password: string;

    constructor(estado: string, nombre: string, rol: string, usuario: string, password: string ){
        this.estado = estado;
        this.nombre = nombre;
        this.rol = rol;
        this.usuario = usuario;
        this.password = password
    }
}