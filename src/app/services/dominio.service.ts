import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../modelos/Respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class DominioService {

  private url:string ="http://127.0.0.1:8082/dominio";

  constructor(private http:HttpClient) { }

  findByNombre(nombre: string):Observable<Respuesta>{
  
    return this.http.get<Respuesta>(this.url + '/consultar/' + nombre);

  }

}
