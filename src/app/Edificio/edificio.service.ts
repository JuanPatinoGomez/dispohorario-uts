import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Edificio } from './edificio';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  private urlApi: string = '';

  constructor(private http: HttpClient,
              private router: Router) { 
    this.urlApi = environment.apiUrl+'/api'
  }

  getEdificiosSedes(id:number): Observable<Edificio[]>{
    return this.http.get<Edificio[]>(`${this.urlApi}/edificios/sede/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/sedes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );;
  }

  getEdificio(id:number): Observable<Edificio>{
    return this.http.get<Edificio>(`${this.urlApi}/edificios/${id}`).pipe(
      catchError(e=>{
        if(e.status!=401 && e.erro.mensaje){
          this.router.navigate(['/sedes']);
          console.log(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

  create(edificio: Edificio): Observable<Edificio>{
    return this.http.post<Edificio>(`${this.urlApi}/edificios`, edificio).pipe(
      map((response: any) => response.edificio as Edificio),
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

  update(edificio: Edificio): Observable<Edificio>{
    return this.http.put<Edificio>(`${this.urlApi}/edificios/${edificio.id}`, edificio).pipe(
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

  delete(edificio: Edificio): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/edificios/${edificio.id}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

}

