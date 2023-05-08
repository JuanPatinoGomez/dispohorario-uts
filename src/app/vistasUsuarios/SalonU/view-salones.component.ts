import { Component, OnInit } from '@angular/core';
import { Salon } from "../../Salon/salon";
import { SalonService } from "../../Salon/salon.service";
import { EdificioService } from "../../Edificio/edificio.service";

import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from 'src/app/Serviciosglobales/barra-nav.service';


@Component({
  selector: 'app-view-salones',
  templateUrl: './view-salones.component.html',
  styleUrls: ['./view-salones.component.css']
})
export class ViewSalonesComponent implements OnInit {

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
      BarraNavService.barraNavButtonsHidden();
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
            this.municipioSede = edificio.sede.municipio
            this.sedeId = edificio.sede.id;
          })
        })
      }
    })
  }

}
