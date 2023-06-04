import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Edificio } from '../Edificio/edificio';

@Injectable({
  providedIn: 'root'
})
export class ModqrService {

  private urlApi: string= '';

  constructor(private http: HttpClient,
    private router: Router) {
      this.urlApi = environment.apiUrl+'/qr';
  }

  qrSede(id:number): void{
    const headers = new HttpHeaders({
      'Content-Type': 'application/zip',
    });
    this.http.get(`${this.urlApi}/sede/${id}`, {
      responseType: 'blob',
      headers: headers,
    }).subscribe((response: Blob) => {
      this.downloadFile(response);
    });
  }

  qrEdificio(id:number): void{
    const headers = new HttpHeaders({
      'Content-Type': 'application/zip',
    });
     this.http.get(`${this.urlApi}/edificio/${id}`, {
      responseType: 'blob',
      headers: headers,
    }).subscribe((response: Blob) => {
      this.downloadFile(response);
    });
  }

  qrSalon(id:number, numero:number, edificio: Edificio): void{
    const headers = new HttpHeaders({
      'Content-Type': 'image/png',
    });
    this.http.get(`${this.urlApi}/salon/${id}`, {
      responseType: 'blob',
      headers: headers,
      observe: 'response', // Obtener la respuesta completa
    }).subscribe((response: HttpResponse<Blob>) => {
      const fileName = edificio.sede.municipio + "_" + edificio.nombre + "_" + numero
      this.generarCodigoQR(response.body, fileName);
    });
  }

  qrApp(): void{
    const headers = new HttpHeaders({
      'Content-Type': 'image/png',
    });
    this.http.get(`${this.urlApi}/app`, {
      responseType: 'blob',
      headers: headers,
      observe: 'response', // Obtener la respuesta completa
    }).subscribe((response: HttpResponse<Blob>) => {
      const fileName = 'app'
      this.generarCodigoQR(response.body, fileName);
    });
  }

  

  generarCodigoQR(blob: Blob, fileName: string): void {
    // Crea un objeto URL para la respuesta
    const url = window.URL.createObjectURL(blob);

    // Crea un elemento de enlace temporal
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.png';

    // Simula el clic en el enlace para descargar la imagen
    link.click();

    // Libera la memoria del objeto URL
    window.URL.revokeObjectURL(url);
  }


  downloadFile(blob: Blob): void {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'images.zip';
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}
