import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../modelos/Respuesta.model';
import { InfoDuenioPets } from '../modelos/InfoDuenioPets.model';
import { DuenioMascota } from '../modelos/DuenioMascota.model';

@Injectable({
  providedIn: 'root'
})
export class DuenioMascotaService {

  private url:string ="http://127.0.0.1:8082/duenio-pet";

  constructor(private http:HttpClient) { }

    saveDuenioMascota(duenioMascota: InfoDuenioPets):Observable<Respuesta>{
    
      return this.http.post<Respuesta>(this.url + '/create-duenio-pet',duenioMascota);
  
    }

    obtenerAllDueniosMascotasByColegio(idColegio: number):Observable<Respuesta>{
      return this.http.get<Respuesta>(this.url + '/all/' + idColegio);
    }

    actualizarDuenioMascota(duenioMascota:DuenioMascota):Observable<Respuesta>{
      return this.http.put<Respuesta>(this.url + '/actualizar' , duenioMascota);
    }

    obtenerInfoDuenioMascota(usuario:string):Observable<Respuesta>{
      return this.http.get<Respuesta>(this.url + '/' + usuario);
    }
}
