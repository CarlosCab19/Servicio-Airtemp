import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familia } from '../shared/material';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  private readonly url="http://127.0.0.1:8000/api/familia/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Familia[]> {
    return this.httpClient.get<Familia[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getByFamilia(familia: string): Observable<Familia> {
    return this.httpClient.get<Familia>(this.url+familia)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getList(id:string):Observable<Familia[]>{
    return this.httpClient.get<Familia[]>(this.url+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id: string | null): Observable<Familia> {
    return this.httpClient.get<Familia>(this.url+ id)
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
