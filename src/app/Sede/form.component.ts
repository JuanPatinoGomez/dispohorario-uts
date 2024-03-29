import { Component, OnInit } from '@angular/core';
import { SedeService } from "./sede.service";
import { Sede } from "./sede";
import { Router, ActivatedRoute } from "@angular/router";
import { BarraNavService } from '../Serviciosglobales/barra-nav.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo: string = "Crear Sede";

  sede: Sede={};
  errores: string[]=[];

  constructor(private sedeService: SedeService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
                this.userLogin();
                BarraNavService.barraNavButtonsVisible();
               }

  ngOnInit(): void {
    this.getCargarSede();
  }

  userLogin() {
    console.log(sessionStorage.getItem('user') === null)
    if(sessionStorage.getItem('user') === null){
      console.log(sessionStorage.getItem('user') === null)
      this.router.navigate(['/login']);
    }
  }

  getCargarSede(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.sedeService.getSede(Number(id)).subscribe(sede=>{
          this.sede=sede
        })
      }
    });
  }

  create(): void{
    this.sedeService.create(this.sede).subscribe({
      next: (sede: Sede)=>{
        this.router.navigate(['/admin/sedes']);
      },
      error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status)
        console.error(err.error.errors)
      }
    });
  }

  update(): void{
    this.sedeService.update(this.sede).subscribe({
      next:(sede)=>{
        this.router.navigate(['/admin/sedes']);
      },
      error:(err)=>{
        this.errores= err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    });
  }

}
