import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { DuenioMascotaService } from 'src/app/services/duenio-mascota.service';
import { MediaService } from 'src/app/services/media.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { DominioService } from 'src/app/services/dominio.service';
import { DuenioMascota } from 'src/app/modelos/DuenioMascota.model';
import { Mascota } from 'src/app/modelos/Mascota.model';
import { DominioInfo } from 'src/app/modelos/Dominioinfo.model';
import * as AppConst from 'src/app/app.constantes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-datos-mascota',
  templateUrl: './datos-mascota.component.html',
  styleUrls: ['./datos-mascota.component.css']
})
export class DatosMascotaComponent implements OnInit {

  isHome: boolean = false; 
  isMascotas: boolean = true;
  isSalir: boolean = true;
  isAgregarMascota = true;
  modalRefCrearMascota!: BsModalRef;
  modalRefCrearVacuna!: BsModalRef;
  duenioMascotas!: DuenioMascota;
  mascotaInfo!: Mascota;
  listaMascotas!: Mascota[];
  btnCrearNaranja: boolean = false; 
  btnCrearGris: boolean = false; 
  btnCrearNaranjaM: boolean = false; 
  btnCrearGrisM: boolean = false; 
  tipoImagen: string = '';
  tipoImagenMascota: string ='';
  listaGenero!:DominioInfo[];
  listaRaza!:DominioInfo[];

  constructor(private modalService:BsModalService
            ,private datosUsuarioService : DatosUsuarioService
            ,private duenioMascotaService : DuenioMascotaService
            ,private mediaService: MediaService
            , private mascotaService : MascotasService
            , private dominioService : DominioService) 
  { 
    this.duenioMascotas={ id:0, tipoPersona:'', noDocumento:'', perfil:''
                          ,nombre:'', apellido:'', email:'', clave:''
                          ,noContacto:'', direccion:'', idCiudad:0, ciudad:''
                          ,estado:'', idPersona:0, idColegio:0 , imagen:''};

    this.mascotaInfo ={ idMascota:0, idDuenio:0 , nombre:''
                    , idRaza:0, idGenero:0 , edad:0
                    , imagen:'', observaciones:''};

  }

  ngOnInit(): void {
    this.tipoImagen = AppConst.TIPO_ARCHIVO_FOTO;
    this.tipoImagenMascota = AppConst.TIPO_ARCHIVO_MASCOTA;
    this.homeSeleccion();
    this.obtenerGeneros(AppConst.DOMINIO_GENERO);
    this.obtenerRazas(AppConst.DOMINIO_RAZA);
    this.obtenerInformacionDuenioMascota(this.datosUsuarioService.getUsuario);
    this.habilitarGuardarInfoDuenioMascota();
    this.habilitarGuardarInfoMascota();

  }

  openModelCrearMascota(crearMascota:TemplateRef<any>){
    this.modalRefCrearMascota = this.modalService.show(crearMascota);
  }

  openModelCrearVacuna(crearVacuna:TemplateRef<any>){
    this.modalRefCrearVacuna = this.modalService.show(crearVacuna);
  }

  homeSeleccion(){
    this.isHome = false;
    this.isMascotas = true;
    this.isSalir = true;
    this.isAgregarMascota = true;
  }

  mascotasSeleccion(){
    this.isHome = true;
    this.isMascotas = false;
    this.isSalir = true;
    this.isAgregarMascota = true;
    this.obtenerAllMascotas();
  }

  salirSeleccion(){
    this.isHome = true;
    this.isMascotas = true;
    this.isSalir = false;
    this.isAgregarMascota = true;
  }

  agregarMascota(){
    
    this.isHome = true;
    this.isMascotas = true;
    this.isSalir = true;
    this.isAgregarMascota = false;
    this.limpiarMascotaInfo();
  }

  actualizarInfoMascota(mascota:Mascota){
    this.isHome = true;
    this.isMascotas = true;
    this.isSalir = true;
    this.isAgregarMascota = false;
    this.mascotaInfo.idMascota = mascota.idMascota;
    this.mascotaInfo.idDuenio = mascota.idDuenio;
    this.mascotaInfo.nombre = mascota.nombre;
    this.mascotaInfo.edad = mascota.edad;
    this.mascotaInfo.idGenero = mascota.idGenero;
    this.mascotaInfo.idRaza = mascota.idRaza;
    this.mascotaInfo.imagen = mascota.imagen;
    this.mascotaInfo.observaciones = mascota.observaciones;
    this.habilitarGuardarInfoMascota();
    
  }



   mostraricono(): boolean{
    if(this.isMascotas===false && this.isAgregarMascota=== false ){
      return true;
    }

    if(this.isMascotas===true && this.isAgregarMascota=== false ){
      return true;
    }
   
    if(this.isMascotas===false && this.isAgregarMascota=== true ){
      return true;
    }

    return false;
  }

  habilitarGuardarInfoDuenioMascota(){
    if((this.duenioMascotas.noDocumento!='' && this.duenioMascotas.noDocumento != null)
        && (this.duenioMascotas.nombre!='' && this.duenioMascotas.nombre != null)
        && (this.duenioMascotas.apellido!='' && this.duenioMascotas.apellido != null)
        && (this.duenioMascotas.noContacto!='' && this.duenioMascotas.noContacto != null)
        && (this.duenioMascotas.clave!='' && this.duenioMascotas.clave != null)
        && (this.duenioMascotas.email!='' && this.duenioMascotas.email != null)
        && (this.duenioMascotas.direccion!='' && this.duenioMascotas.direccion != null)
    ){
      this.btnCrearNaranja = false;
      this.btnCrearGris = true;
    }
    else{
      this.btnCrearNaranja = true;
      this.btnCrearGris = false;
    }
  }

  habilitarGuardarInfoMascota(){
    if((this.mascotaInfo.nombre !='' && this.mascotaInfo.nombre!=null)
        && (this.mascotaInfo.idGenero!= 0 && this.mascotaInfo.idGenero!=null)
        && (this.mascotaInfo.idRaza!=0 && this.mascotaInfo.idRaza!=null)
        && (this.mascotaInfo.edad!=0 && this.mascotaInfo.edad!=null)
    ){
      this.btnCrearNaranjaM = false;
      this.btnCrearGrisM = true;
    }
    else {
      this.btnCrearNaranjaM = true;
      this.btnCrearGrisM = false;
    }

  }

  obtenerInformacionDuenioMascota(usuario:string){
    this.duenioMascotaService.obtenerInfoDuenioMascota(usuario).subscribe(
     (response) =>{
       if(response.exitoso){
         this.duenioMascotas = response.datos;
       }
     },
     (error) =>{
       console.log(error);
 
     }
    )
  }

  actualizarInfoDuenioMascota(){
    this.duenioMascotaService.actualizarDuenioMascota(this.duenioMascotas).subscribe(
      (response) =>{

      },
      (error)=>{
        console.log(error);
      }
    )
  }

  upload(event: any,tipo:string){
      const file = event.target.files[0];
      
      if(file){
        const formData = new FormData();
        formData.append('file',file);
        this.mediaService.uploadFile(formData, this.duenioMascotas.idPersona, tipo).subscribe( 
          (response) => {
            if(tipo === AppConst.TIPO_ARCHIVO_FOTO){
              this.duenioMascotas.imagen = response.datos.urlArchivo;
            }
            if(tipo === AppConst.TIPO_ARCHIVO_CONTRATO){
              //this.duenioColegioInfo.urlContrato = response.datos.urlArchivo;
              //this.duenioColegioInfo.contrato = response.datos.nombreFile;
            }
            
          }
        )
      }
  } 

  uploadPet(event: any,tipo:string){
    const file = event.target.files[0];
    
    if(file){
      const formData = new FormData();
      formData.append('file',file);
      this.mediaService.uploadFilePet(formData, this.duenioMascotas.idPersona,this.mascotaInfo.idMascota ,tipo).subscribe( 
        (response) => {
          if(tipo === AppConst.TIPO_ARCHIVO_MASCOTA){
            this.duenioMascotas.imagen = response.datos.urlArchivo;
          }
          if(tipo === AppConst.TIPO_ARCHIVO_CONTRATO){
            //this.duenioColegioInfo.urlContrato = response.datos.urlArchivo;
            //this.duenioColegioInfo.contrato = response.datos.nombreFile;
          }
          
        }
      )
    }
} 

  guardarMascota(){
    this.mascotaService.saveMascota(this.mascotaInfo).subscribe(
      (response) =>{

      },
      (error)=>{
        console.log(error);
      }
    )
  }

  actualizarMascota(){
    this.mascotaService.actualizarMascota(this.mascotaInfo).subscribe(
      (response) =>{

      },
      (error)=>{
        console.log(error);
      }
    )
  }

  salvarInfoMascota(){
    this.mascotaInfo.idDuenio = this.duenioMascotas.id;
    if(this.mascotaInfo.idMascota>0){
      this.actualizarMascota();
    }
    else {
      this.guardarMascota();
    }
    this.obtenerAllMascotas();
    this.mascotasSeleccion();
  }

  obtenerAllMascotas(){
    this.mascotaService.obtenerMascotas(this.duenioMascotas.id).subscribe(
      (response)=>{
        if(response.exitoso){
            this.listaMascotas = response.datos;
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  obtenerGeneros(nombreDominio:string){
    this.dominioService.findByNombre(nombreDominio).subscribe(
      (response) =>{
        if(response.exitoso){
          this.listaGenero = response.datos
        }
      },
      (error) =>{
        console.log(error);

      }
    );  
  }

  obtenerRazas(nombreDominio:string){
    this.dominioService.findByNombre(nombreDominio).subscribe(
      (response) =>{
        if(response.exitoso){
          this.listaRaza = response.datos
        }
      },
      (error) =>{
        console.log(error);

      }
    );  
  }

  limpiarMascotaInfo(){
    this.mascotaInfo ={ idMascota:0, idDuenio:0 , nombre:''
      , idRaza:0, idGenero:0 , edad:0
      , imagen:'', observaciones:''};
  }
}
