import { TipoServiciosInfo } from "./TipoServiciosInfo.model";

export class DuenioColegioInfo {
    constructor(
    public clave: string,
     public idPersona : number,
     public idDuenioColegio : number,
     public email: string,
     public tipoPersona: string,
     public nombre : String,
     public apellido : string,
     public razonSocial : string,
     public noDocumento : string,
     public noContacto : string,
     public idMembresia : number,
     public idTipoMembresia: number,
     public descripcionTipoMembresia : String,
     public nombreMembresia : string,
     public valorMembresia : string,
     public estado : string,
     public descripcionMembresia1 : string,
     public descripcionMembresia2 : string,
     public urlImagen : string,
     public descripcionNegocio : string,
     public ciudad : string,
     public direccion : string,
     public contrato : string,
     public urlContrato : string,
     public paginaWeb : string,
     public tipoServicios : TipoServiciosInfo[]

 ) {
 }
}