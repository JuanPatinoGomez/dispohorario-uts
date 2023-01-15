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
    this.getClasesSalonSort();
    this.llenarClasesDias();
  }

  getClasesSalon(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.claseService.getClasesSalon(Number(id)).subscribe(clases=>{
          this.clases=clases
          this.salonId = Number(id);
        })
      }
    })
  }

  getClasesSalonSort(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.claseService.getClasesSalonSort(Number(id)).subscribe(clases=>{
          this.clases=clases
          this.salonId = Number(id);
          this.clasesLunes = this.clases.filter(x => x['dia'] === "Lunes");
          this.clasesMartes = this.clases.filter(x => x['dia'] === "Martes");
          this.clasesMiercoles = this.clases.filter(x => x['dia'] === "Miercoles");
          this.clasesJueves = this.clases.filter(x => x['dia'] === "Jueves");
          this.clasesViernes = this.clases.filter(x => x['dia'] === "Viernes");
          this.clasesSabado = this.clases.filter(x => x['dia'] === "Sabado");
        })
      }
    })
  }

  llenarClasesDias(){
    console.log(this.clases)
    this.clasesLunes = this.clases.filter(x => x['dia'] === "Lunes");
    console.log(this.clasesLunes)
  }

}
