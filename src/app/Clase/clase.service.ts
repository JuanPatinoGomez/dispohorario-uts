import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Clase } from "./clase";

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private urlApi: string = '';

  constructor(private http: HttpClient,
    private router: Router) { 
      this.urlApi = environment.apiUrl+'/api'
    }

    getClasesSalon(id:number): Observable<Clase[]>{
      return this.http.get<Clase[]>(`${this.urlApi}/clases/salon/${id}`).pipe(
        catchError(e=>{
          if(e.status!=401 && e.erro.mensaje){
            this.router.navigate(['/sedes']);
            console.log(e.error.mensaje);
          }
          return throwError(()=>e);
        })
      );;
    }

    getClasesSalonSort(id:number): Observable<Clase[]>{
      return this.http.get<Clase[]>(`${this.urlApi}/clases/salon/${id}/sort/horainicio`).pipe(
        catchError(e=>{
          if(e.status!=401 && e.erro.mensaje){
            this.router.navigate(['/sedes']);
            console.log(e.error.mensaje);
          }
          return throwError(()=>e);
        })
      );;
    }
  
    getClase(id:number): Observable<Clase>{
      return this.http.get<Clase>(`${this.urlApi}/clases/${id}`).pipe(
        catchError(e=>{
          if(e.status!=401 && e.erro.mensaje){
            this.router.navigate(['/sedes']);
            console.log(e.error.mensaje);
          }
          return throwError(()=>e);
        })
      );
    }
  
    create(clase: Clase): Observable<Clase>{
      return this.http.post<Clase>(`${this.urlApi}/clases`, clase).pipe(
        map((response: any) => response.clase as Clase),
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
    
    update(clase: Clase): Observable<Clase>{
      return this.http.put<Clase>(`${this.urlApi}/clases/${clase.id}`, clase).pipe(
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
  
    delete(clase: Clase): Observable<any>{
      return this.http.delete<any>(`${this.urlApi}/clases/${clase.id}`).pipe(
        catchError(e=>{
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
          return throwError(()=>e);
        })
      );
    }

    getHorasDispo(id:number, dia:string): Observable<string[]>{
      return this.http.get<string[]>(`${this.urlApi}/clases/horasOcupadas/salon/${id}/dia/${dia}`).pipe(
        catchError(e=>{
          if(e.status!=401 && e.erro.mensaje){
            this.router.navigate(['/sedes']);
            console.log(e.error.mensaje);
          }
          return throwError(()=>e);
        })
      );;
    }
}
