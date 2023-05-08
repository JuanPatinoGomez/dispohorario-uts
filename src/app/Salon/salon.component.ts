import { Component, OnInit } from '@angular/core';
import { Salon } from "./salon";
import { SalonService } from "./salon.service";
import { EdificioService } from "../Edificio/edificio.service";

import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from '../Serviciosglobales/barra-nav.service';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  title = 'Salon';
  salones: Salon[]=[];
  edificioId: number=0;
  municipioSede: string= '';
  edificioSalon: string= '';
  sedeId: number=0;

  constructor(private salonService: SalonService,
    private edificioService: EdificioService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { 
      this.userLogin();
      BarraNavService.barraNavButtonsVisible();
    }

  userLogin() {
    console.log(sessionStorage.getItem('user') === null)
    if (sessionStorage.getItem('user') === null) {
      console.log(sessionStorage.getItem('user') === null)
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getSalonesEdificio();
  }

  getSalonesEdificio(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.salonService.getSalonesEdificio(Number(id)).subscribe(salones=>{
          this.salones=salones
          this.edificioId = Number(id);
          this.edificioService.getEdificio(this.edificioId).subscribe(edificio => {
            this.edificioSalon = edificio.nombre;
            this.municipioSede = edificio.sede.municipio;
            this.sedeId = edificio.sede.id;
          })
        })
      }
    })
  }

delete(salon: Salon): void{
  this.salonService.delete(salon).subscribe({
    next: () => {
      this.salones = this.salones.filter(edi => edi != salon)
    }
  });
}

}
