import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModqrService {

  private urlApi: string= '';

  constructor(private http: HttpClient,
    private router: Router) {
      this.urlApi = environment.apiUrl+'/qr';
  }

  qrSede(id:number): Observable<string>{
    return this.http.get<string>(`${this.urlApi}/sede/${id}`);
  }

  qrEdificio(id:number): Observable<string>{
    return this.http.get<string>(`${this.urlApi}/edificio/${id}`);
  }

  qrSalon(id:number): Observable<string>{
    return this.http.get<string>(`${this.urlApi}/salon/${id}`);
  }

  qrApp(): Observable<string>{
    return this.http.get<string>(`${this.urlApi}/app`);
  }
}
