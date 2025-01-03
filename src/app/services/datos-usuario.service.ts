import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuarioService {

  private _id: number = 0;
  private _usuario: string = '';
  private _email: string = '';
  private _perfil: string = '';
  private _estado: string = '';

  get getId(){
    return  this._id ;
  }

  setId(id:number){
      this._id = id;
  }

  get getUsuario(){
    return  this._usuario ;
  }

  setUsuario(usuario:string){
      this._usuario = usuario;
  }

  get getEmail(){
    return  this._email ;
  }

  setEmail(email:string){
      this._email = email;
  }

  get getPerfil(){
    return  this._perfil ;
  }

  setPerfil(perfil:string){
      this._perfil = perfil;
  }

  get getEstado(){
    return  this._estado ;
  }

  setEstado(estado:string){
      this._estado = estado;
  }
  constructor() { }
}
