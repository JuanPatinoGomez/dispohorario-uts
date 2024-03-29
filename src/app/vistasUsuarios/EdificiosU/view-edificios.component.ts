import { Component, OnInit } from '@angular/core';
import { EdificioService } from "../../Edificio/edificio.service";
import { Edificio } from "../../Edificio/edificio";
import { SedeService } from "../../Sede/sede.service";

import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from 'src/app/Serviciosglobales/barra-nav.service';


@Component({
  selector: 'app-view-edificios',
  templateUrl: './view-edificios.component.html',
  styleUrls: ['./view-edificios.component.css']
})
export class ViewEdificiosComponent implements OnInit {

  title = 'Edificio';
  edificios: Edificio[]=[];
  sedeId: number=0;
  municipioSede: string= '';

  constructor(private edificioService: EdificioService,
    private sedeService: SedeService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { 
      BarraNavService.barraNavButtonsHidden();
    }

  ngOnInit(): void {
    this.getEdificiosSedes();
  }

  getEdificiosSedes(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.edificioService.getEdificiosSedes(Number(id)).subscribe(edificios=>{
          this.edificios=edificios
          this.sedeId = Number(id);
          this.sedeService.getSede(this.sedeId).subscribe(sede => {
            console.log(sede);
            this.municipioSede = sede.municipio
          });
        })
      }
    })
}

}
