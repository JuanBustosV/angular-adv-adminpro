import { environment } from "src/environments/environment";

const base_url = environment.base_url; // localhost:3000/api

export class Usuario {

    constructor(

        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,        
        public google?: boolean,       
        public role?: string,
        public uid?: string,

    ) {};

    imprimirUsuario() {
        console.log( this.nombre );
    }

    get imagenUrl() {
        // console.log(this.img);

        if ( !this.img ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else
        // Si es la imagen de Google
        if ( this.img.includes('https') ) {
            return this.img;
        }
        else
        // localhost:3000/api/upload/usuarios/no-image
        if( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }

        return '';
    }
}