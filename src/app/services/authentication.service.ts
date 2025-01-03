import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InicioSession } from '../modelos/InicioSession.model';
import { Respuesta } from 'src/app/modelos/Respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url:string ="http://127.0.0.1:8082/authentication";

  constructor(private http:HttpClient) { }

  login(user:InicioSession):Observable<any>{
    return this.http.post<Respuesta>(this.url + '/inicio-sesion',user);
  }
}
