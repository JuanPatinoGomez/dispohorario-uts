import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarraNavService {

  constructor() { }

  static barraNavButtonsHidden(): void {
    document.getElementById('barra_n').style.visibility = 'hidden';
  }

  static barraNavButtonsVisible(): void {
    document.getElementById('barra_n').style.visibility = '';
  }
}
