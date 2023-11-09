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
  /*subirArchivo(archivo: File, idCotizacion: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id_cotizacion', idCotizacion.toString()); // Agregar el id_cotizacion al FormData

    return this.httpClient.post(this.url, formData);
  }*/

  subirArchivo(archivo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name);

    return this.httpClient.post(this.url, formData);
  }

  /*obtenerPDF(nombre: string) {
    return this.httpClient.get(this.url + nombre, { responseType: 'blob' });
  }*/
  obtenerPDF(idCotizacion: string) {
    // Ajusta la URL para incluir el idCotizacion en lugar del nombre
    return this.httpClient.get(this.url + 'id/' + idCotizacion, { responseType: 'blob' });
  }


  eliminarArchivo(nombre: string): Observable<any> {
    return this.httpClient.delete(this.url + nombre);
  }

}
