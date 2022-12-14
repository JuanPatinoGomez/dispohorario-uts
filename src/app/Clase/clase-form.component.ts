import { Component, OnInit, } from '@angular/core';
import { ClaseService } from "./clase.service";
import { Clase } from "./clase";
import { Router, ActivatedRoute } from "@angular/router";
import { Salon } from "../Salon/salon";

@Component({
  selector: 'app-clase-form',
  templateUrl: './clase-form.component.html',
  styleUrls: ['./clase-form.component.css']
})
export class ClaseFormComponent implements OnInit {

  selectHoras;
  titulo: string = "Crear clase";

  clase: Clase={};
  errores: string[]=[];

  salonId: number=0;
  salon: Salon={};

  semana: string[]=['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  horas: string[]=['06:00', '07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30'];
  horasDisponibles : string[]=[];
  constructor(private claseService: ClaseService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.getCargarClase();
    this.selectHoras = document.getElementById("selectHoras");
  }

  getCargarClase(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.claseService.getClase(Number(id)).subscribe(clase=>{
          this.clase=clase
        })
      }
      //Aqui almacenamos el id del salon
      let idsalon = params.get('idsalon');
      if(idsalon){
        this.salonId = Number(idsalon);
        this.salon.id = this.salonId;
      }
    });
  }

  create(): void{
    //Antes de crear la clase le asignamos el salon
    this.clase.salon =this.salon;
    this.claseService.create(this.clase).subscribe({
      next: (clase: Clase)=>{
        this.router.navigate([`/clases/salon/${clase.salon.id}`]);
      },
      error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    });
    
  }

  update(): void{
    this.claseService.update(this.clase).subscribe({
      next:(clase)=>{
        this.router.navigate([`/clases/salon/${clase.salon.id}`]);
      },
      error:(err)=>{
        this.errores= err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }

  compararDias(o1: String, o2: String): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1 == o2;
  }
  
  compararHoras(h1: String, h2: String): boolean {
    if (h1 === undefined && h2 === undefined) {
      return true;
    }
    return h1 === null || h2 === null || h1 === undefined || h2 === undefined ? false : h1 == h2;
  }

  onChange(targetdias) {
    this.horas=['06:00', '07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30'];
    console.log(targetdias);
    console.log(targetdias.value);
    this.selectHoras.selectedIndex = 0;
    if(targetdias.value === "0: undefined"){
      //this.horas[0]='000000';
      document.getElementById("selectHoras").setAttribute("disabled","");
    }else{
      //this.horas[0]='sadfdas';
      document.getElementById("selectHoras").removeAttribute("disabled");
      this.claseService.getHorasDispo(this.salonId,targetdias.value.substr(3)).subscribe(horaa => this.horas=horaa);
      console.log(this.horas);
    }
  }

  
}
