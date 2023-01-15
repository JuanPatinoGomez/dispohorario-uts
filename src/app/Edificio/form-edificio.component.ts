import { Component, OnInit } from '@angular/core';
import { EdificioService } from "./edificio.service";
import { Edificio } from "./edificio";
import { Router, ActivatedRoute } from "@angular/router";
import { Sede } from "../Sede/sede";
import { BarraNavService } from '../Serviciosglobales/barra-nav.service';

@Component({
  selector: 'app-form-edificio',
  templateUrl: './form-edificio.component.html',
  styleUrls: ['./form-edificio.component.css']
})
export class FormEdificioComponent implements OnInit {

  titulo: string = "Crear edificio";

  edificio: Edificio={};
  errores: string[]=[];

  sedeId: number=0;
  sede: Sede={};

  constructor(private edificioService: EdificioService,
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
    this.getCargarEdificio();
  }

  getCargarEdificio(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.edificioService.getEdificio(Number(id)).subscribe(edificio=>{
          this.edificio=edificio
        })
      }
      //Aqui almacenamos el id de la sede
      let idsede = params.get('idsede');
      if(idsede){
        this.sedeId = Number(idsede);
        this.sede.id = this.sedeId;
      }
    });
  }

  create(): void{
    //Antes de crear el edificio le asignamos la sede
    this.edificio.sede =this.sede;
    this.edificioService.create(this.edificio).subscribe({
      next: (edificio: Edificio)=>{
        this.router.navigate([`/admin/edificios/sede/${edificio.sede.id}`]);
      },
      error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    });
  }

  update(): void{
    this.edificioService.update(this.edificio).subscribe({
      next:(edificio)=>{
        this.router.navigate([`/admin/edificios/sede/${edificio.sede.id}`]);
      },
      error:(err)=>{
        this.errores= err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }
}
