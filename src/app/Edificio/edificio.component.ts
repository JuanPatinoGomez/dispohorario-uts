import { Component, OnInit } from '@angular/core';
import { EdificioService } from "./edificio.service";
import { Edificio } from "./edificio";
import { SedeService } from "../Sede/sede.service";

import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from '../Serviciosglobales/barra-nav.service';


@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html',
  styleUrls: ['./edificio.component.css']
})
export class EdificioComponent implements OnInit {

  title = 'Edificio';
  edificios: Edificio[]=[];
  sedeId: number=0;
  municipioSede: string= '';

  constructor(private edificioService: EdificioService,
    private sedeService: SedeService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
      this.userLogin();
      BarraNavService.barraNavButtonsVisible();
  }

  userLogin() {
    console.log(sessionStorage.getItem('user') === null)
    if(sessionStorage.getItem('user') === null){
      console.log(sessionStorage.getItem('user') === null)
      this.router.navigate(['/login']);
    }
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

  delete(edificio: Edificio): void{
    this.edificioService.delete(edificio).subscribe({
      next: () => {
        this.edificios = this.edificios.filter(edi => edi != edificio)
      }
    });
  }

}
