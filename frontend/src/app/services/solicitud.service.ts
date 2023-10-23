import { Injectable } from '@angular/core';
import { Solicitud } from '../shared/solicitud';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private readonly url:string="http://127.0.0.1:8000/api/solicitud/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Solicitud[]> {
    return this.httpClient.get<Solicitud[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getNueva(): Observable<Solicitud[]> {
    return this.httpClient.get<Solicitud[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getCotizado(): Observable<Solicitud[]> {
    return this.httpClient.get<Solicitud[]>(this.url+'/Cotizado')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getAprovado(): Observable<Solicitud[]> {
    return this.httpClient.get<Solicitud[]>(this.url+'/Aprovado')
    .pipe(
      catchError(this.errorHandler)
    )
  }


  getList(id:string):Observable<Solicitud[]>{
    return this.httpClient.get<Solicitud[]>(this.url+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: string | null, solicitud: any): Observable<Solicitud> {
    return this.httpClient.put<Solicitud>(this.url + id, JSON.stringify(solicitud), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  updateAnalista(id: string | null, solicitud: any): Observable<Solicitud> {
    return this.httpClient.put<Solicitud>(this.url + '/upA'+ id, JSON.stringify(solicitud), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  updateDirector(id: string | null, solicitud: any): Observable<Solicitud> {
    return this.httpClient.put<Solicitud>(this.url + 'upD/' + id, JSON.stringify(solicitud), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(solicitud: any): Observable<Solicitud> {
    return this.httpClient.post<Solicitud>(this.url, JSON.stringify(solicitud), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  find(id: string | null): Observable<Solicitud> {
    return this.httpClient.get<Solicitud>(this.url +'get/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string | number){
    return this.httpClient.delete<Solicitud>(this.url + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
