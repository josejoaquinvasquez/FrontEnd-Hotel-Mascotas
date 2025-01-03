import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaInfo } from '../modelos/PersonaInfo.model';
import { Respuesta } from 'src/app/modelos/Respuesta.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string ="http://127.0.0.1:8082/user";

  constructor(private http:HttpClient) { }

  //create user
  create(user:PersonaInfo):Observable<any>{
    return this.http.post<Respuesta>(this.url + '/create',user);
  }
}
