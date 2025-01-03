export class ServicioInfo {
    constructor(
        public id : number,
        public idDuenio: number,
        public nombreServicio : string,
        public tipoServicio : number,
        public descripcionServicio : string,
        public diaLunes : boolean,
        public diaMartes : boolean,
        public diaMiercoles : boolean,
        public diaJueves : boolean,
        public diaViernes : boolean,
        public diaSabado : boolean,
        public diaDomingo : boolean,
        public valorServicio : number,
        public puntos : number
    ) {}
}