export class Mascota {
    constructor(
        public idMascota: number,
        public idDuenio: number,
        public nombre: string,
        public idRaza: number,
        public idGenero: number,
        public edad: number,
        public imagen: string,
        public observaciones: string
    )
    {}
}