import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url:string ="http://127.0.0.1:8082/media";

  constructor(private http:HttpClient) { }

  uploadFile(formData: FormData,
              idPersona: number,
              tipoArchivo: string
  ): Observable<any>{
  
    const params = new HttpParams()
    .set('id', idPersona)
    .set('tipo', tipoArchivo);
    
    return this.http.post(this.url + "/upload", formData,{ params: params});

  }

  uploadFilePet(formData: FormData,
    idPersona: number,
    idMascota: number,
    tipoArchivo: string
): Observable<any>{

const params = new HttpParams()
.set('idPersona', idPersona)
.set('idMascota', idMascota)
.set('tipo', tipoArchivo);

return this.http.post(this.url + "/upload-pet", formData,{ params: params});

}
}
