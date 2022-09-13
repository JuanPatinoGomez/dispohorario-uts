import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Sede } from "./sede";

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private urlApi: string= '';

  constructor(private http: HttpClient,
              private router: Router) {
    this.urlApi = environment.apiUrl+'/api';
   }

  getSedes(): Observable<Sede[]>{
    return this.http.get<Sede[]>(this.urlApi+'/sedes');
  }

  create(sede: Sede): Observable<Sede>{
    return this.http.post<Sede>(`${this.urlApi}/sedes`, sede).pipe(
      map((response: any) => response.sede as Sede),
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

  getSede(id:number): Observable<Sede>{
    return this.http.get<Sede>(`${this.urlApi}/sedes/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/sedes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

  update(sede: Sede): Observable<Sede>{
    return this.http.put<Sede>(`${this.urlApi}/sedes/${sede.id}`, sede).pipe(
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

  delete(sede: Sede): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/sedes/${sede.id}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }
}
