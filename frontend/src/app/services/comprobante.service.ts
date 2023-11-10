import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comprovante } from '../shared/cotizacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  private readonly url = "http://127.0.0.1:8000/api/comprobante/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient:HttpClient) { }
  getAll(): Observable<Comprovante[]> {
    return this.httpClient.get<Comprovante[]>(this.url+'all');
  }
  getOne(id:string): Observable<Comprovante[]> {
    return this.httpClient.get<Comprovante[]>(this.url+id);
  }
  subirArchivo(archivo: File, idCotizacion: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id_cotizacion', idCotizacion.toString());

    return this.httpClient.post(`${this.url}store`, formData);
  }
  obtenerPDF(idCotizacion: string) {
    return this.httpClient.get(this.url + 'id/' + idCotizacion, { responseType: 'blob' });
  }

  eliminarArchivo(idCotizacion: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/'+ idCotizacion);
  }

}
