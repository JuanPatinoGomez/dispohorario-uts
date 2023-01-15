import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SedeService } from "../Sede/sede.service";
import { Sede } from "../Sede/sede";
import { EdificioService } from "../Edificio/edificio.service";
import { Edificio } from "../Edificio/edificio";
import { SalonService } from "../Salon/salon.service";
import { Salon } from "../Salon/salon";
import { ModqrService } from './modqr.service';

@Component({
  selector: 'app-moduloqr',
  templateUrl: './moduloqr.component.html',
  styleUrls: ['./moduloqr.component.css']
})
export class ModuloqrComponent implements OnInit {

  sedes: Sede[]=[];
  edificios: Edificio[]=[];
  salones: Salon[]=[];
  mensaje: string = '';

  constructor(private sedeService: SedeService,
    private edificioService: EdificioService,
    private salonService: SalonService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private modqrService: ModqrService) {
      this.userLogin();
     }

  userLogin() {
    console.log(sessionStorage.getItem('user') === null)
    if (sessionStorage.getItem('user') === null) {
      console.log(sessionStorage.getItem('user') === null)
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getSedes();
  }

  getSedes(): void{
    this.sedeService.getSedes().subscribe(response =>{
      this.sedes = response;
    });
  }
  
  traerEdificios(sede: Sede): void{
    
    this.edificioService.getEdificiosSedes(Number(sede.id)).subscribe(edificios=>{
      this.edificios=edificios
    })
  }

  traerSalones(edificio: Edificio) : void{
    this.salones = [];
    this.salonService.getSalonesEdificio(Number(edificio.id)).subscribe(salones=>{
      this.salones=salones
    })
  }


  //Servicios que generan los codigos qr

  qrSede(sede: Sede): void{
    this.mensaje = '';
    this.modqrService.qrSede(sede.id).subscribe(response =>{
      this.mensaje = response['mensaje'];
      console.log(response)
    });
  }

  qrEdificio(edificio: Edificio): void{
    this.mensaje = '';
    this.modqrService.qrEdificio(edificio.id).subscribe(response =>{
      this.mensaje = response['mensaje'];
      console.log(response)
    });
  }

  qrSalon(salon: Salon): void{
    this.mensaje = '';
    this.modqrService.qrSalon(salon.id).subscribe(response =>{
      this.mensaje = response['mensaje'];
      console.log(response)
    });
  }

  qrApp(): void{
    this.mensaje = '';
    this.modqrService.qrApp().subscribe(response =>{
      this.mensaje = response['mensaje'];
      console.log(response)
    });
  }

  detectFiles(event){
    console.log(event.currentTarget.files[0].webkitRelativePath);
  }

}
