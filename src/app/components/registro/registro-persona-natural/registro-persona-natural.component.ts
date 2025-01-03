import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DominioService } from 'src/app/services/dominio.service';
import { PersonaInfo } from 'src/app/modelos/PersonaInfo.model';
import { DominioInfo } from 'src/app/modelos/Dominioinfo.model';
import { Respuesta } from 'src/app/modelos/Respuesta.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as AppConst from 'src/app/app.constantes';
@Component({
  selector: 'app-registro-persona-natural',
  templateUrl: './registro-persona-natural.component.html',
  styleUrls: ['./registro-persona-natural.component.css']
})
export class RegistroPersonaNaturalComponent implements OnInit {

  modalRefCrearUsuario!: BsModalRef;
  tipoPersona = ''; 
  perfil = ''; 
  mensajeError ='';
  public personaInfo !: PersonaInfo;
  public respuesta : Respuesta;
  public listaPlanes:DominioInfo[];
  habilitaBtnCrear: boolean = false; 
  btnCrearNaranja: boolean = false; 
  btnCrearGris: boolean = false; 

  errorMessage: any;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private modalService:BsModalService,
              private dominioService : DominioService) 
  {

        this.listaPlanes = [
      {id :0,nombre:'',descripcion:'', valor :'', descripcionOpcional :'', descripcionOpcional1 :'', descripcionOpcional2 :''}
    ];

    this.respuesta ={
      datos:'',
      errores:'',
      exitoso:false,
      mensaje:''
    }

   }

  ngOnInit(): void {
    var head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.src = 'assets/js/registro.js';
    head.appendChild(script);
    this.tipoPersona = AppConst.TIPO_PERSONA_NATURAL;
    this.perfil = AppConst.PERFIL_DUENO_COLEGIO;
    this.habilitarDeshabilitarBtoCrear();
    this.obtenerPlanes(AppConst.PLANES_COLEGIOS);
    this.mensajeError='';

  }

  personaNatural(){
    this.router.navigate(['/registro-persona-natural']);
  }

  personaJuridica(){
    this.router.navigate(['/registro-persona-juridica']);
  }

  regresarHome(){
    this.router.navigate(['/home']);
  }

  create(crearExitoso:TemplateRef<any>) {
    this.personaInfo.perfil = this.perfil;
    this.personaInfo.tipoPersona =this.tipoPersona;
    this.usuarioService.create(this.personaInfo).subscribe(
      (response) =>{
        this.respuesta = response;
        this.modalRefCrearUsuario = this.modalService.show(crearExitoso);
      
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
        }
      },
      (error) =>{
        console.log(error);
      }
    );  
  
  }

  valor(idPlan:number){
    this.personaInfo.plan = idPlan;
  }

  habilitarDeshabilitarBtoCrear(){
    if(this.personaInfo.apellido != '' 
      && this.personaInfo.nombre != ''
      && this.personaInfo.email != ''
      && this.personaInfo.clave != ''
      && this.personaInfo.plan != 0
      )
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
