import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Cotizacion } from '../shared/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private readonly url="http://127.0.0.1:8000/api/cotizacion/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Cotizacion[]> {
    return this.httpClient.get<Cotizacion[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:string):Observable<Cotizacion[]>{
    return this.httpClient.get<Cotizacion[]>(this.url+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(cotizacion: Cotizacion): Observable<Cotizacion> {
    return this.httpClient.post<Cotizacion>(this.url, JSON.stringify(cotizacion), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id: string | null): Observable<Cotizacion> {
    return this.httpClient.get<Cotizacion>(this.url + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id: string | number, cotizacion: any): Observable<Cotizacion> {
    return this.httpClient.put<Cotizacion>(this.url + id, JSON.stringify(cotizacion), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  updateDirector(id: string | number, cotizacion: any): Observable<Cotizacion> {
    return this.httpClient.put<Cotizacion>(this.url + id, JSON.stringify(cotizacion), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id: string | number){
    return this.httpClient.delete<Cotizacion>(this.url + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = 'ERRORRRRRRRRRRRRRRRRR!!!!!!!';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
