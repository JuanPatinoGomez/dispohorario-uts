import { Component, OnInit } from '@angular/core';
import { SedeService } from "../../Sede/sede.service";
import { Sede } from "../../Sede//sede";

@Component({
  selector: 'app-view-sede',
  templateUrl: './view-sede.component.html',
  styleUrls: ['./view-sede.component.css']
})
export class ViewSedeComponent implements OnInit {

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



}
