import { Component, OnInit } from '@angular/core';
import { SedeService } from "./sede.service";
import { Sede } from "./sede";

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  title = 'Sede';
  sedes: Sede[]=[];

  constructor(private sedeService: SedeService) { }

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
