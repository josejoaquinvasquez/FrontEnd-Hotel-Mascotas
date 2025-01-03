import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DominioService } from 'src/app/services/dominio.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DominioInfo } from 'src/app/modelos/Dominioinfo.model';
import { Respuesta } from 'src/app/modelos/Respuesta.model';
import { InicioSession } from 'src/app/modelos/InicioSession.model';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

import * as AppConst from 'src/app/app.constantes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  modalRefInicioSesion!: BsModalRef;
  modalRefRecuperarCuenta!: BsModalRef;
  listaPlanes:DominioInfo[];
  basico:DominioInfo;
  estandar:DominioInfo;
  premium:DominioInfo;
  inicioSession:InicioSession;
  public respuesta : Respuesta;
  errorMessage: any;
  mensajeError ='';
  habilitaBtnCrear: boolean = false; 
  btnCrearNaranja: boolean = false; 
  btnCrearGris: boolean = false; 

  constructor(private router: Router,
              private modalService:BsModalService,
              private dominioService : DominioService,
              private authenticationService : AuthenticationService,
              private datosUsuarioService : DatosUsuarioService) { 
    
    this.listaPlanes = [
      {id :0,nombre:'',descripcion:'', valor :'', descripcionOpcional :'', descripcionOpcional1 :'', descripcionOpcional2 :''}
    ];

    this.basico={
      id:0,nombre:'',descripcion:'', valor :'', descripcionOpcional :'', descripcionOpcional1 :'' , descripcionOpcional2 :''
    };

    this.estandar={
      id:0,nombre:'',descripcion:'', valor :'', descripcionOpcional :'', descripcionOpcional1 :'', descripcionOpcional2 :''
    };

    this.premium={
      id:0,nombre:'',descripcion:'', valor :'', descripcionOpcional :'', descripcionOpcional1 :'', descripcionOpcional2 :''
    };

    this.inicioSession ={
      usuario : '' , clave :''
    };

    this.respuesta ={
      datos:'',
      errores:'',
      exitoso:false,
      mensaje:''
    };

  }

  ngOnInit(): void {
    var head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.src = 'assets/js/home.js';
    head.appendChild(script);
    this.habilitarDeshabilitarBtoCrear();
    this.obtenerPlanes(AppConst.PLANES_COLEGIOS);

  }

  openModelInicioSesion(iniciosesion:TemplateRef<any>){
    this.modalRefInicioSesion = this.modalService.show(iniciosesion);
  }

  openModelRecuperarClave(recuperarclave:TemplateRef<any>){
    this.modalRefInicioSesion.hide();
    this.modalRefRecuperarCuenta = this.modalService.show(recuperarclave);
  }

  irARegistrarColegio() {

    this.router.navigate(['/registro-persona-juridica']);
}

  irAHome() {
    this.router.navigate(['/home']);
  }

  irAColegio(){
    this.authenticationService.login(this.inicioSession).subscribe(
      (response) =>{
        this.modalRefInicioSesion.hide();
        this.respuesta = response;
        this.datosUsuarioService.setId(this.respuesta.datos.id);
        this.datosUsuarioService.setUsuario(this.respuesta.datos.usuario);
        this.datosUsuarioService.setEmail(this.respuesta.datos.email);
        this.datosUsuarioService.setPerfil(this.respuesta.datos.perfil);
        this.datosUsuarioService.setEstado(this.respuesta.datos.estado);
        
        switch(this.respuesta.datos.perfil) {
            case AppConst.PERFIL_ADMINISTRADOR_PLATAFORMA:
                 break;

            case AppConst.PERFIL_DUENO_COLEGIO:
                  this.router.navigate(['/duenio-colegio']);
                  break;
            
            case AppConst.PERFIL_DUENO_MASCOTA:
              this.router.navigate(['/cliente-colegio']);
                break;
        }
      
      },
      (error) =>{
        this.errorMessage = error;
        this.mensajeError = this.errorMessage.error.mensaje;
      }     
    );
   
  }

  obtenerPlanes(nombreDominio:string){
    this.dominioService.findByNombre(nombreDominio).subscribe(
      (response) =>{
        if(response.exitoso){
          this.listaPlanes = response.datos

          this.listaPlanes.find((plan) =>{
            if(plan.id===1){
              this.basico = plan;
            }
      
            if(plan.id===2){
              this.estandar = plan;
            }   
      
            if(plan.id===3){
              this.premium = plan;
            }   
         });
       
        }
        
        
      },
      (error) =>{
        console.log(error);
      }
    );  
  }

  habilitarDeshabilitarBtoCrear(){
    if(this.inicioSession.usuario != '' 
      && this.inicioSession.clave != '')
      {
        this.habilitaBtnCrear = false;
        this.btnCrearNaranja = true;
        this.btnCrearGris = false;
    }
    else {
      
      this.habilitaBtnCrear = true;
      this.btnCrearNaranja = false;
      this.btnCrearGris = true; 
    }
    
  }

  limpiarMensajeError(){
    this.mensajeError ='';
  }
  
}
