import { Component, OnInit } from '@angular/core';
import { ClaseService } from "./clase.service";
import { Clase } from "./clase";

import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from '../Serviciosglobales/barra-nav.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  title = 'Clase';
  clases: Clase[]=[];
  clasesOrdenadasPorDia :Clase[]=[];
  salonId: number=0;

  constructor(private claseService: ClaseService,
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
    this.getClasesSalon();
  }

  getClasesSalon(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.claseService.getClasesSalon(Number(id)).subscribe(clases=>{
          this.clasesOrdenadasPorDia.push(...clases.filter(cd => cd.dia === "Lunes"));
          this.clasesOrdenadasPorDia.push(...clases.filter(cd => cd.dia === "Martes"));
          this.clasesOrdenadasPorDia.push(...clases.filter(cd => cd.dia === "Miercoles"));
          this.clasesOrdenadasPorDia.push(...clases.filter(cd => cd.dia === "Jueves"));
          this.clasesOrdenadasPorDia.push(...clases.filter(cd => cd.dia === "Viernes"));
          this.clases= this.clasesOrdenadasPorDia;
          this.salonId = Number(id);
        })
      }
    })
  }

delete(clase: Clase): void{
  this.claseService.delete(clase).subscribe({
    next: () => {
      this.clases = this.clases.filter(cla => cla != clase)
    }
  });
}


}



