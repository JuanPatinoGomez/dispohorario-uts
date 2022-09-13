import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Salon } from "./salon";

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private urlApi: string = '';

  constructor(private http: HttpClient,
    private router: Router) {
      this.urlApi = environment.apiUrl+'/api'
  }

  getSalonesEdificio(id:number): Observable<Salon[]>{
    return this.http.get<Salon[]>(`${this.urlApi}/salones/edificio/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/sedes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );;
  }

  getSalon(id:number): Observable<Salon>{
    return this.http.get<Salon>(`${this.urlApi}/salones/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/sedes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

  create(salon: Salon): Observable<Salon>{
    return this.http.post<Salon>(`${this.urlApi}/salones`, salon).pipe(
      map((response: any) => response.salon as Salon),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        if(e.errors.mensaje){
          console.log(e.errors.mensaje);
        } 
        return throwError(()=>e);
      })
    );
  }
  
  update(salon: Salon): Observable<Salon>{
    return this.http.put<Salon>(`${this.urlApi}/salones/${salon.id}`, salon).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

  delete(salon: Salon): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/salones/${salon.id}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

}
