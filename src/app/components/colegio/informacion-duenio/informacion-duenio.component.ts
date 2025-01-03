import { Component, OnInit} from '@angular/core';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { DuenioColegioService } from 'src/app/services/duenio-colegio.service';
import { MediaService } from 'src/app/services/media.service';
import { FilesService } from 'src/app/services/files.service';
import { DuenioColegioInfo } from 'src/app/modelos/DuenioColegioInfo.model';
import { MediaInfo } from 'src/app/modelos/Mediainfo.model';
import * as AppConst from 'src/app/app.constantes';
import { TipoServiciosInfo } from '../../../modelos/TipoServiciosInfo.model';
import { ServicioInfo } from 'src/app/modelos/ServicioInfo.model';

@Component({
  selector: 'app-informacion-duenio',
  templateUrl: './informacion-duenio.component.html',
  styleUrls: ['./informacion-duenio.component.css']
})
export class InformacionDuenioComponent implements OnInit {

  isHome: boolean = true; 
  isServiciosPrincipal: boolean = false;
  isServiciosSecundario: boolean = true;
  isServiciosAgregar: boolean = true;
  isMembresia: boolean = true; 
  isNotificacion: boolean = true;
  isPerfil : boolean = true;
  isOpenFile: boolean = true;
  duenioColegioInfo: DuenioColegioInfo;
  servicioInfo : ServicioInfo;
  tipoServiciosInfo: TipoServiciosInfo;
  urlImagen?: string;
  mediaInfo: MediaInfo;
  tipoLogo: string = '';
  tipoContrato: string = '';
  btnCrearNaranja: boolean = false; 
  btnCrearGris: boolean = false; 
  btnGuardarMembNaranja: boolean = false; 
  btnGuardarMembGris: boolean = false; 
  
  isCorreo:boolean = true;
  isClave:boolean = true;
  typeClave:string ='password';
  isTelefono: boolean = false;

  isLunesActivo:boolean =false;
  isLunesInactivo:boolean =true;
  isMartesActivo:boolean =false;
  isMartesInactivo:boolean =true;
  isMiercolesActivo:boolean =false;
  isMiercolesInactivo:boolean =true;
  isJuevesActivo:boolean =false;
  isJuevesInactivo:boolean =true;
  isViernesActivo:boolean =false;
  isViernesInactivo:boolean =true;
  isSabadoActivo:boolean =false;
  isSabadoInactivo:boolean =true
  isDomingoActivo:boolean =false;
  isDomingoInactivo:boolean =true;

  idTipoServicio:number=0;

  constructor(private datosUsuarioService : DatosUsuarioService,
              private duenioColegioService : DuenioColegioService,
              private mediaService: MediaService,
              private filesService: FilesService) { 
  
    this.duenioColegioInfo ={
      clave: '', idPersona :0, idDuenioColegio:0, email :'',tipoPersona :'',
      nombre : '',apellido : '', razonSocial :'',
      noDocumento : '',noContacto :'',
      idMembresia : 0, idTipoMembresia: 0,
      descripcionTipoMembresia :'',nombreMembresia : '',
      valorMembresia : '', estado : '',
      descripcionMembresia1 : '',descripcionMembresia2 :'',
      urlImagen:'' , descripcionNegocio:'', ciudad:'',
      direccion:'', contrato:'', urlContrato:'', paginaWeb:'' ,
      tipoServicios: [{id:0 , idDuenio:0, nombre:'',estado:''} ]
    }

    this.tipoServiciosInfo ={
      id:0,idDuenio:0,nombre:'',estado:''
    }
    
    this.mediaInfo ={
      id:0,
      file:new FormData()
    }

    this.servicioInfo ={
      id:0,idDuenio:0, nombreServicio:'', tipoServicio : 0, descripcionServicio:''
      ,diaLunes:false , diaMartes: false, diaMiercoles : false, diaJueves:false
      ,diaViernes:false , diaSabado:false, diaDomingo: false
      ,valorServicio:0 , puntos:0
    }
   
  }

  ngOnInit(): void {
     this.obtenerInformacionDuenioColegio(this.datosUsuarioService.getUsuario);
     this.tipoContrato = AppConst.TIPO_ARCHIVO_CONTRATO;
     this.tipoLogo = AppConst.TIPO_ARCHIVO_LOGO;
     this.habilitarDeshabilitarBtoGuardarPerfil();
     this.habilitarDeshabilitarBtoGuardarMembresia();
     this.habilitaCampoCorreo();
     this.habilitaCampoClave();
     this.habilitaCampoTelefono();
      
  }


 homeSeleccion(){
  this.isHome = true;
  this.isServiciosPrincipal = true;
  this.isServiciosSecundario = true;
  this.isServiciosAgregar = true;
  this.isMembresia = true;
  this.isNotificacion = true;
  this.isPerfil = true;
 }

 serviciosPrincipalSeleccion(){
  this.isHome = true;
  this.isServiciosPrincipal = false;
  this.isServiciosSecundario = true;
  this.isServiciosAgregar = true;
  this.isMembresia = true;
  this.isNotificacion = true;
  this.isPerfil = true;
 }

 serviciosSecundariosSeleccion(){
  this.isHome = true;
  this.isServiciosPrincipal = true;
  this.isServiciosSecundario = false;
  this.isServiciosAgregar = true;
  this.isMembresia = true;
  this.isNotificacion = true;
  this.isPerfil = true;
 }

 serviciosAgregarSeleccion(){
  this.isHome = true;
  this.isServiciosPrincipal = true;
  this.isServiciosSecundario = true;
  this.isServiciosAgregar = false;
  this.isMembresia = true;
  this.isNotificacion = true;
  this.isPerfil = true;
 }

 membresiaSeleccion(){
  this.isHome = true;
  this.isServiciosPrincipal = true;
  this.isServiciosSecundario = true;
  this.isServiciosAgregar = true;
  this.isMembresia = false;
  this.isNotificacion = true;
  this.isPerfil = true;
 }

 perfilSeleccion(){
  this.isHome = true;
  this.isServiciosPrincipal = true;
  this.isServiciosSecundario = true;
  this.isServiciosAgregar = true;
  this.isMembresia = true;
  this.isNotificacion = true;
  this.isPerfil = false;
 }

 obtenerInformacionDuenioColegio(usuario:string){
   this.duenioColegioService.findDuenioColegioInfo(usuario).subscribe(
    (response) =>{
      if(response.exitoso){
        this.duenioColegioInfo = response.datos;
        this.habilitarOpenFile();
        this.habilitaCampoCorreo();
        this.habilitaCampoClave();
        this.habilitaCampoTelefono();
      }
    },
    (error) =>{
      console.log(error);

    }
   )
 }

 upload(event: any,tipo:string){
  const file = event.target.files[0];

  if(file){
    const formData = new FormData();
    formData.append('file',file);
    this.mediaService.uploadFile(formData, this.duenioColegioInfo.idPersona, tipo).subscribe(
      (response) => {
        if(tipo === AppConst.TIPO_ARCHIVO_LOGO){
          this.duenioColegioInfo.urlImagen = response.datos.urlArchivo;
        }
        if(tipo === AppConst.TIPO_ARCHIVO_CONTRATO){
          this.duenioColegioInfo.urlContrato = response.datos.urlArchivo;
          this.duenioColegioInfo.contrato = response.datos.nombreFile;
        }
        
      }
    )
  }
  this.habilitarOpenFile();
 }

 openFile(){
  this.filesService.getFile(this.duenioColegioInfo.urlContrato)
    .then(response => response.blob())
    .then(pdf => {
      window.open(URL.createObjectURL(pdf), '_blank');
    })
    .catch(err => {
      console.log(err);
    });
}
 
habilitarOpenFile(){
  if(this.duenioColegioInfo.contrato.length===0){
    this.isOpenFile = true; 
  } else {
    this.isOpenFile = false; 
  }
}
 
habilitarDeshabilitarBtoGuardarPerfil(){
  if(this.duenioColegioInfo.razonSocial != '' 
    && this.duenioColegioInfo.descripcionNegocio != ''
    && this.duenioColegioInfo.noContacto != ''
    && this.duenioColegioInfo.ciudad != ''
    && this.duenioColegioInfo.direccion != ''  
    && this.duenioColegioInfo.email != ''
  )
    {
     
      this.btnCrearNaranja = true;
      this.btnCrearGris = false;
  }
  else {
    this.btnCrearNaranja = false;
    this.btnCrearGris = true; 
  }
  
}

habilitarDeshabilitarBtoGuardarMembresia(){
  if(this.duenioColegioInfo.email.length > 0
      && this.duenioColegioInfo.clave.length> 0
      && this.duenioColegioInfo.noContacto.length > 0)
  {
      this.btnGuardarMembNaranja = true;
      this.btnGuardarMembGris = false;
  }
  else{
    this.btnGuardarMembNaranja = false;
    this.btnGuardarMembGris = true;
  }
}
saveDuenioColegioPerfil(){
  this.duenioColegioService.saveDuenioColegioPerfil(this.duenioColegioInfo).subscribe(
   (response) =>{
     if(response.exitoso){
       this.duenioColegioInfo = response.datos;
       this.habilitarOpenFile();
       this.habilitaCampoCorreo();
       this.habilitaCampoClave();
       this.habilitaCampoTelefono();
     }
   },
   (error) =>{
     console.log(error);

   }
  )
}

saveDuenioColegioMembresia(){
  this.duenioColegioService.saveDuenioColegioMembresia(this.duenioColegioInfo).subscribe(
   (response) =>{
     if(response.exitoso){
       this.duenioColegioInfo = response.datos;
       this.habilitarOpenFile();
       this.habilitaCampoCorreo();
       this.habilitaCampoClave();
       this.habilitaCampoTelefono();
     }
   },
   (error) =>{
     console.log(error);

   }
  )
}
 habilitaCampoCorreo(){
    if(this.duenioColegioInfo.email.length==0){
      this.isCorreo = false;
    }
    else {
      this.isCorreo = true;
    }
 }

 habilitaCampoClave(){
    if(this.duenioColegioInfo.clave.length==0){
      this.isClave = false;
    }
    else {
      this.isClave = true;
      this.typeClave='password';
    }
 }

 habilitaCampoTelefono(){
    if(this.duenioColegioInfo.noContacto.length==0){
      this.isTelefono = false;
    }
    else {
      this.isTelefono = true;
    }
 }

 habilitaEditarCorreo(){
    this.isCorreo = false;
 }

 habilitaEditarClave(){
    this.isClave = false;
    this.typeClave= 'text';
 }

 habilitaEditarTelefono(){
    this.isTelefono = false;
 }

 habilitarDiaLunes(lunesInactivo:boolean, lunesActivo:boolean){
  this.isLunesInactivo= !lunesInactivo;
  this.isLunesActivo =  !lunesActivo; 
}
habilitarDiaMartes(martesInactivo:boolean, martesActivo:boolean){
  this.isMartesInactivo= !martesInactivo;
  this.isMartesActivo =  !martesActivo; 
}

habilitarDiaMiercoles(miercolesInactivo:boolean, miercolesActivo:boolean){
  this.isMiercolesInactivo= !miercolesInactivo;
  this.isMiercolesActivo =  !miercolesActivo; 
}

 habilitarDiaJueves(juevesInactivo:boolean, juevesActivo:boolean){
    this.isJuevesInactivo= !juevesInactivo;
    this.isJuevesActivo =  !juevesActivo; 
 }

 habilitarDiaViernes(viernesInactivo:boolean, viernesActivo:boolean){
  this.isViernesInactivo= !viernesInactivo;
  this.isViernesActivo =  !viernesActivo; 
}

habilitarDiaSabado(sabadoInactivo:boolean, sabadoActivo:boolean){
  this.isSabadoInactivo= !sabadoInactivo;
  this.isSabadoActivo =  !sabadoActivo; 
}

habilitarDiaDomingo(domingoInactivo:boolean, domingoActivo:boolean){
  this.isDomingoInactivo= !domingoInactivo;
  this.isDomingoActivo =  !domingoActivo; 
}


}
