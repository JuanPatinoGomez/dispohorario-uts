import { Component, OnInit } from '@angular/core';
import { ClaseService } from "../../Clase/clase.service";
import { Clase } from "../../Clase/clase";

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

  clasesLunes: Clase[]=[];
  clasesMartes: Clase[]=[];
  clasesMiercoles: Clase[]=[];
  clasesJueves: Clase[]=[];
  clasesViernes: Clase[]=[];
  clasesSabado: Clase[]=[];


  constructor(private claseService: ClaseService,
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
        this.claseService.getClasesSalon(Number(id)).subscribe(clases=>{
          this.clasesLunes.push(...clases.filter(cd => cd.dia === "Lunes"));
          this.clasesMartes.push(...clases.filter(cd => cd.dia === "Martes"));
          this.clasesMiercoles.push(...clases.filter(cd => cd.dia === "Miercoles"));
          this.clasesJueves.push(...clases.filter(cd => cd.dia === "Jueves"));
          this.clasesViernes.push(...clases.filter(cd => cd.dia === "Viernes"));
        })
      }
    })
  }
}
