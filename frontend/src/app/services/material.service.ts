import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Material } from '../shared/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private readonly url="http://127.0.0.1:8000/api/material/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
  constructor(private httpClient:HttpClient) { }
  getAll(): Observable<Material[]> {
    return this.httpClient.get<Material[]>(this.url)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:string):Observable<Material[]>{
    return this.httpClient.get<Material[]>(this.url+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(material: Material): Observable<Material> {
    return this.httpClient.post<Material>(this.url, JSON.stringify(material), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id: string | null): Observable<Material> {
    return this.httpClient.get<Material>(this.url + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id: string | number, material: any): Observable<Material> {
    return this.httpClient.put<Material>(this.url + id, JSON.stringify(material), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id: string | number){
    return this.httpClient.delete<Material>(this.url + id, this.httpOptions)
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
