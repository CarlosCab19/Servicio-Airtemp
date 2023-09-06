import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Personal } from '../interfaces/personal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private readonly url="http://127.0.0.1:8000/api/personal/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }
 constructor(private httpClient: HttpClient) { }

 /*filtrado(): Observable <Personal[]> {
   let direccion = this.url;
   return this.httpClient.get<Personal[]>(direccion);

 }*/

 getAll(): Observable<Personal[]> {
   return this.httpClient.get<Personal[]>(this.url)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(personal: any): Observable<Personal> {
   return this.httpClient.post<Personal>(this.url, JSON.stringify(personal), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id: string | number): Observable<Personal> {
   return this.httpClient.get<Personal>(this.url + id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id: string | number, personal: any): Observable<Personal> {
   return this.httpClient.put<Personal>(this.url + id, JSON.stringify(personal), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id: number){
   return this.httpClient.delete<Personal>(this.url + id, this.httpOptions)
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
