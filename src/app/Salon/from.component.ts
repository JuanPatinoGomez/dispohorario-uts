import { Component, OnInit } from '@angular/core';
import { Salon } from "./salon";
import { SalonService } from "./salon.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Edificio } from "../Edificio/edificio";

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit {

  titulo: string = "Crear salon";

  salon: Salon={};
  errores: string[]=[];

  edificioId: number=0;
  edificio: Edificio={};

  constructor(private salonService: SalonService, 
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCargarSalon();
  }

  getCargarSalon(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.salonService.getSalon(Number(id)).subscribe(salon=>{
          this.salon=salon
        })
      }
      //Aqui almacenamos el id del edificio
      let idedificio = params.get('idedificio');
      if(idedificio){
        this.edificioId = Number(idedificio);
        this.edificio.id = this.edificioId;
      }
    });
  }

  create(): void{
    //Antes de crear el salon le asignamos el edificio
    this.salon.edificio =this.edificio;
    this.salonService.create(this.salon).subscribe({
      next: (salon: Salon)=>{
        this.router.navigate([`/salones/edificio/${salon.edificio.id}`]);
      },
      error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    });
  }

  update(): void{
    this.salonService.update(this.salon).subscribe({
      next:(salon)=>{
        this.router.navigate([`/salones/edificio/${salon.edificio.id}`]);
      },
      error:(err)=>{
        this.errores= err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }
}
