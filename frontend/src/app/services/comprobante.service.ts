import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comprobante } from '../shared/cotizacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  private readonly url = "http://10.1.0.152:8000/api/comprobante/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient:HttpClient) { }
  getAll(): Observable<Comprobante[]> {
    return this.httpClient.get<Comprobante[]>(this.url+'all');
  }
  getOne(id:string): Observable<Comprobante[]> {
    return this.httpClient.get<Comprobante[]>(this.url+id);
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
  editarArchivo(archivo: File, idCotizacion: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('archivo', archivo, archivo.name);
    formData.append('id_cotizacion', idCotizacion.toString());  // Asegúrate de enviar también la ID de cotización

    return this.httpClient.put(`${this.url}${idCotizacion}`, formData);
  }

}
