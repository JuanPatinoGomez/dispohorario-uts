import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SedeService } from "./sede.service";
import { Sede } from "./sede";
import { BarraNavService } from '../Serviciosglobales/barra-nav.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  title = 'Sede';
  sedes: Sede[]=[];


  constructor(private sedeService: SedeService,
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
    this.getSedes();
  }

  getSedes(): void{
    this.sedeService.getSedes().subscribe(response =>{
      this.sedes = response;
    });
  }

  delete(sede: Sede): void{
    this.sedeService.delete(sede).subscribe({
      next: () => {
        this.sedes = this.sedes.filter(sed => sed != sede)
      }
    });
  }


}
