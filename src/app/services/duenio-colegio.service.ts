import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../modelos/Respuesta.model';
import { DuenioColegioInfo } from '../modelos/DuenioColegioInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DuenioColegioService {

  private url:string ="http://127.0.0.1:8082/duenio";

  constructor(private http:HttpClient) { }

  findDuenioColegioInfo(usuario: string):Observable<Respuesta>{
  
    return this.http.get<Respuesta>(this.url + '/consultar/' + usuario);

  }

  saveDuenioColegioPerfil(duenio: DuenioColegioInfo):Observable<Respuesta>{
  
    return this.http.post<Respuesta>(this.url + '/create-step-perfil',duenio);

  }

  saveDuenioColegioMembresia(duenio: DuenioColegioInfo):Observable<Respuesta>{
  
    return this.http.post<Respuesta>(this.url + '/create-step-membresia',duenio);

  }
}
