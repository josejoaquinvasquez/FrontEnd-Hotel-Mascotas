export class Respuesta {
   
    constructor(
        public datos:any,
        public errores: any,
        public exitoso: boolean,
        public mensaje:string
    ) {}
}