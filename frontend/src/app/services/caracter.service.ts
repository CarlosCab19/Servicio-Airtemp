import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Caracteristica } from '../shared/material';

@Injectable({
  providedIn: 'root'
})
export class CaracterService {

  private readonly url="http://127.0.0.1:8000/api/caracteristica/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Caracteristica[]> {
    return this.httpClient.get<Caracteristica[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:string):Observable<Caracteristica[]>{
    return this.httpClient.get<Caracteristica[]>(this.url+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id: string | null): Observable<Caracteristica> {
    return this.httpClient.get<Caracteristica>(this.url +'get/' + id)
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
