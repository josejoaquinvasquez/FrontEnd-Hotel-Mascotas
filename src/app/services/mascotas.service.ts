import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../modelos/Respuesta.model';
import { Mascota } from '../modelos/Mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private url:string ="http://127.0.0.1:8082/pet";

  constructor(private http:HttpClient) { }

  saveMascota(mascota: Mascota):Observable<Respuesta>{
      return this.http.post<Respuesta>(this.url + '/create',mascota);
  }

  obtenerMascotas(idDuenio: number):Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url + '/all/' + idDuenio);
  }
  
  actualizarMascota(mascota:Mascota):Observable<Respuesta>{
    return this.http.put<Respuesta>(this.url + '/update' , mascota);
  }
}
