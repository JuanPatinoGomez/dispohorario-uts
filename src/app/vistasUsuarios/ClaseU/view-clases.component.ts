import { Component, OnInit } from '@angular/core';
import { ClaseService } from "../../Clase/clase.service";
import { Clase } from "../../Clase/clase";
import { SalonService } from "../../Salon/salon.service";
import { EdificioService } from "../../Edificio/edificio.service";

import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from 'src/app/Serviciosglobales/barra-nav.service';

@Component({
  selector: 'app-view-clases',
  templateUrl: './view-clases.component.html',
  styleUrls: ['./view-clases.component.css']
})
export class ViewClasesComponent implements OnInit {

  title = 'Clase';
  clases: Clase[]=[];
  salonId: number=0;
  edificioId: number=0;

  clasesLunes: Clase[]=[];
  clasesMartes: Clase[]=[];
  clasesMiercoles: Clase[]=[];
  clasesJueves: Clase[]=[];
  clasesViernes: Clase[]=[];
  clasesSabado: Clase[]=[];

  municipioSede: string= '';
  edificioSalon: string= '';
  salonEdificio: string= '';


  constructor(private claseService: ClaseService,
    private edificioService: EdificioService,
    private salonService: SalonService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
      BarraNavService.barraNavButtonsHidden();
     }

  ngOnInit(): void {
    this.getClasesSalon();
  }

  getClasesSalon(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.claseService.getClasesSalonCompleto(Number(id)).subscribe(clases=>{
          this.clasesLunes.push(...clases.filter(cd => cd.dia === "Lunes"));
          this.clasesMartes.push(...clases.filter(cd => cd.dia === "Martes"));
          this.clasesMiercoles.push(...clases.filter(cd => cd.dia === "Miercoles"));
          this.clasesJueves.push(...clases.filter(cd => cd.dia === "Jueves"));
          this.clasesViernes.push(...clases.filter(cd => cd.dia === "Viernes"));
          this.clasesSabado.push(...clases.filter(cd => cd.dia === "Sabado"));
          console.log(this.clasesLunes);
          this.salonId = Number(id);
          this.salonService.getSalon(this.salonId).subscribe(salon => {
            this.salonEdificio = salon.numero.toString();
            this.edificioSalon = salon.edificio.nombre;
            this.edificioService.getEdificio(salon.edificio.id).subscribe(edificio => {
              this.municipioSede = edificio.sede.municipio
              this.edificioId = salon.edificio.id;
            })
          });
        })
      }
    })
  }
}
