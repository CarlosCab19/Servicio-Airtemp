import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caractermaterial } from '../shared/material';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaractermaterialService {

  private readonly url="http://10.1.0.152:8000/api/caractermaterial/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Caractermaterial[]> {
    return this.httpClient.get<Caractermaterial[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:string):Observable<Caractermaterial[]>{
    return this.httpClient.get<Caractermaterial[]>(this.url+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(caractermaterial: Caractermaterial): Observable<Caractermaterial> {
    return this.httpClient.post<Caractermaterial>(this.url, JSON.stringify(caractermaterial), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id: string | null): Observable<Caractermaterial> {
    return this.httpClient.get<Caractermaterial>(this.url +'get/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id: string | number, caractermaterial: any): Observable<Caractermaterial> {
    return this.httpClient.put<Caractermaterial>(this.url + id, JSON.stringify(caractermaterial), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id: string | number){
    return this.httpClient.delete<Caractermaterial>(this.url + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = 'Error';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
