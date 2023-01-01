import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Usuario } from './usuario';
import { Edificio } from 'src/app/Edificio/edificio';
import { UsuarioForm } from './usuarioForm';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi: string = '';

  constructor(private http: HttpClient,
              private router: Router) { 
    this.urlApi = environment.apiUrl+'/api'
  }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlApi+'/usuarios');
  }

  create(usuario: UsuarioForm): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.urlApi}/usuarios`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
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

  validar(usuario: UsuarioForm): Observable<{}>{
    return this.http.post<{}>(this.urlApi+'/usuarios/validacion', usuario);
  }

  delete(usuario: Usuario): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/usuarios/${usuario.id}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    );
  }

  //Se usa el mismo del create que actualiza
  cambioEstado(usuario: Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(this.urlApi+'/usuarios/' + usuario.id + '/cambioEstado');
  }

}
