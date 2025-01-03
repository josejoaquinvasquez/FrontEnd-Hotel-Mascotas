import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DuenioColegioService } from 'src/app/services/duenio-colegio.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { DuenioMascotaService } from 'src/app/services/duenio-mascota.service';
import { MediaService } from 'src/app/services/media.service';
import { FilesService } from 'src/app/services/files.service';
import * as AppConst from 'src/app/app.constantes';
import { InfoDuenioPets } from 'src/app/modelos/InfoDuenioPets.model';
import { DuenioColegioInfo } from 'src/app/modelos/DuenioColegioInfo.model';
import { DuenioMascota } from 'src/app/modelos/DuenioMascota.model';

@Component({
  selector: 'app-datos-duenio-colegio',
  templateUrl: './datos-duenio-colegio.component.html',
  styleUrls: ['./datos-duenio-colegio.component.css']
})
export class DatosDuenioColegioComponent implements OnInit {

  isHome: boolean = false; 
  isClientes: boolean = true;
  isAgregarClientes: boolean = true;
  isSalir: boolean = true;
  tipoLogo: string = '';
  infoDuenioPets!: InfoDuenioPets;
  duenioColegioInfo!: DuenioColegioInfo;
  listaDuenioMascotas!: DuenioMascota[];
  duenioMascota!: DuenioMascota;
  btnCrearNaranja: boolean = false; 
  btnCrearGris: boolean = false; 
  btnCrearNaranjaDM: boolean = false; 
  btnCrearGrisDM: boolean = false; 
  isNuevo: boolean = true;
  filter: string ='';

  constructor(private router: Router,
    private mediaService: MediaService,
    private duenioColegioService : DuenioColegioService,
    private datosUsuarioService : DatosUsuarioService,
    private filesService: FilesService,
    private duenioMascotaService : DuenioMascotaService) { 
  
      this.infoDuenioPets = {  tipoPersona: AppConst.TIPO_PERSONA_NATURAL, perfil : AppConst.PERFIL_DUENO_MASCOTA, noDocumento :''
                              , nombre :'', apellido : '' , email : '', clave : ''
                              , noContacto : '' , idColegio : 0 , noContactoDC : ''
                              , emailDC : ''
                            }

      this.duenioMascota = { id:0 , tipoPersona :'', noDocumento :'', perfil : AppConst.PERFIL_DUENO_MASCOTA
                              , nombre:'' , apellido :'', email:'' , clave:'', noContacto :'', direccion:''
                              ,idCiudad:0 , ciudad:'' , estado :'' , idPersona: 0, idColegio :0 , imagen:''
                            }

    }

  ngOnInit(): void {
    this.tipoLogo = AppConst.TIPO_ARCHIVO_LOGO;
    this.homeSeleccion();
    this.obtenerInformacionDuenioColegio(this.datosUsuarioService.getUsuario);
    this.obtenerInfoDueniosMascotas(this.datosUsuarioService.getId);
    this.limpiarDatosDuenioMascota();
    this.habilitarDeshabilitarBtoGuardarDuenio();
    this.habilitarDeshBtoGuardarDMascota();
   }

  homeSeleccion(){
    this.isHome = false;
    this.isClientes = true;
    this.isAgregarClientes = true;
    this.isSalir = true;
  }

  clientesSeleccion(){
    this.isHome = true;
    this.isClientes = false;
    this.isAgregarClientes =true;
    this.isSalir = true;
  }
  agregarClienteSeleccion(){
    this.isHome = true;
    this.isClientes = true;
    this.isAgregarClientes =false;
    this.isSalir = true;
  }

  salirSeleccion(){
    this.isHome = true;
    this.isClientes = true;
    this.isAgregarClientes = true;
    this.isSalir = false;
    this.router.navigate(['/home']);
  }

  obtenerInformacionDuenioColegio(usuario:string){
    this.duenioColegioService.findDuenioColegioInfo(usuario).subscribe(
     (response) =>{
       if(response.exitoso){
         this.duenioColegioInfo = response.datos;
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
            //this.duenioColegioInfo.urlContrato = response.datos.urlArchivo;
            //this.duenioColegioInfo.contrato = response.datos.nombreFile;
          }
          
        }
      )
    }
   } 
   
   saveInformacionDuenioColegio(){
      this.duenioColegioService.saveDuenioColegioPerfil(this.duenioColegioInfo).subscribe(
       (response) =>{
         if(response.exitoso){
           this.duenioColegioInfo = response.datos;
         }
       },
       (error) =>{
         console.log(error);
    
       }
      )
  }

  saveInformacionDuenioMascota(){
    if(this.isNuevo==true){
      this.infoDuenioPets.tipoPersona = AppConst.TIPO_PERSONA_NATURAL;
      this.infoDuenioPets.perfil = AppConst.PERFIL_DUENO_MASCOTA;
      this.infoDuenioPets.idColegio = this.datosUsuarioService.getId;
      this.infoDuenioPets.emailDC = this.datosUsuarioService.getEmail;
      this.infoDuenioPets.noContactoDC = this.duenioColegioInfo.noContacto;
  
      this.duenioMascotaService.saveDuenioMascota(this.infoDuenioPets).subscribe(
        (response) =>{
          if(response.exitoso){
            this.limpiarDatosDuenioMascota();
            this.habilitarDeshBtoGuardarDMascota();
            this.obtenerInfoDueniosMascotas(this.datosUsuarioService.getId);
            this.clientesSeleccion();
          }
        },
        (error) =>{
          console.log(error);
     
        }
       )
    }
    else {

          this.duenioMascota.noDocumento = this.infoDuenioPets.noDocumento;
          this.duenioMascota.nombre = this.infoDuenioPets.nombre;
          this.duenioMascota.apellido = this.infoDuenioPets.apellido;
          this.duenioMascota.email = this.infoDuenioPets.email;
          this.duenioMascota.noContacto = this.infoDuenioPets.noContacto;
          this.duenioMascotaService.actualizarDuenioMascota(this.duenioMascota).subscribe(
            (response)=>{
              if(response.exitoso){
                this.limpiarDatosDuenioMascota();
                this.habilitarDeshBtoGuardarDMascota();
                this.obtenerInfoDueniosMascotas(this.datosUsuarioService.getId);
                this.clientesSeleccion();

              }
            },
            (error) =>{
              console.log(error);
         
            }
          )
    }    

    this.isNuevo = true;
  }

  obtenerInfoDueniosMascotas(idColegio:number){

    this.duenioMascotaService.obtenerAllDueniosMascotasByColegio(idColegio).subscribe(
      (response) =>{
          this.listaDuenioMascotas = response.datos;
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  actualizarInfoDuenioMascota(){
    this.duenioMascotaService.actualizarDuenioMascota(this.duenioMascota).subscribe(
      (response) =>{

      },
      (error)=>{
        console.log(error);
      }
    )
  }
  
   habilitarDeshabilitarBtoGuardarDuenio(){
    if((this.duenioColegioInfo.descripcionNegocio != null || this.duenioColegioInfo.descripcionNegocio != '')
      && (this.duenioColegioInfo.nombre != null || this.duenioColegioInfo.nombre != '')
      && (this.duenioColegioInfo.noDocumento != null || this.duenioColegioInfo.noDocumento != '' )
      && (this.duenioColegioInfo.apellido != null || this.duenioColegioInfo.apellido != '')
      && (this.duenioColegioInfo.razonSocial != null || this.duenioColegioInfo.razonSocial !='')
      && (this.duenioColegioInfo.noContacto != null  || this.duenioColegioInfo.noContacto != '')
      && (this.duenioColegioInfo.email != null || this.duenioColegioInfo.email !='')
      && (this.duenioColegioInfo.clave != null || this.duenioColegioInfo.clave !='')
    )
      {
       
        this.btnCrearNaranja = false;
        this.btnCrearGris = true;
    }
    else {
      this.btnCrearNaranja = true;
      this.btnCrearGris = false; 
    }
    
  }


  habilitarDeshBtoGuardarDMascota(){
    if((this.infoDuenioPets.noDocumento != null && this.infoDuenioPets.noDocumento != '')
      && (this.infoDuenioPets.nombre != null && this.infoDuenioPets.nombre != '')
      && (this.infoDuenioPets.apellido != null && this.infoDuenioPets.apellido != '' )
      && (this.infoDuenioPets.noContacto != null && this.infoDuenioPets.noContacto != '')
      && (this.infoDuenioPets.email != null && this.infoDuenioPets.email !=''))
      {
       
        this.btnCrearNaranjaDM = false;
        this.btnCrearGrisDM = true;
    }
    else {
      this.btnCrearNaranjaDM = true;
      this.btnCrearGrisDM = false; 
    }
  }

  limpiarDatosDuenioMascota(){
    this.infoDuenioPets.perfil = AppConst.PERFIL_DUENO_MASCOTA;
    this.infoDuenioPets.noDocumento = '';
    this.infoDuenioPets.nombre = '';
    this.infoDuenioPets.apellido = '';
    this.infoDuenioPets.email = '';
    this.infoDuenioPets.clave = '';
    this.infoDuenioPets.noContacto = '';
    this.infoDuenioPets.idColegio = this.datosUsuarioService.getId;
    this.infoDuenioPets.noContactoDC = this.duenioColegioInfo.noContacto;
    this.infoDuenioPets.emailDC = this.datosUsuarioService.getEmail;
    
  }

  asignarInfoDuenioMascota(datos:DuenioMascota){
    this.isNuevo = false;
    this.duenioMascota = datos;

    this.infoDuenioPets.perfil = AppConst.PERFIL_DUENO_MASCOTA;
    this.infoDuenioPets.noDocumento = datos.noDocumento;
    this.infoDuenioPets.nombre = datos.nombre;
    this.infoDuenioPets.apellido = datos.apellido;
    this.infoDuenioPets.email = datos.email;
    this.infoDuenioPets.clave = datos.clave;
    this.infoDuenioPets.noContacto = datos.noContacto;
    this.infoDuenioPets.idColegio = this.datosUsuarioService.getId;
    this.infoDuenioPets.noContactoDC = this.duenioColegioInfo.noContacto;
    this.infoDuenioPets.emailDC = this.datosUsuarioService.getEmail;
    this.agregarClienteSeleccion();
    this.habilitarDeshBtoGuardarDMascota();

    
  }
}
