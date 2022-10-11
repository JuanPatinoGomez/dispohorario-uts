import { Component, OnInit } from '@angular/core';
import { Salon } from "../../Salon/salon";
import { SalonService } from "../../Salon/salon.service";

import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-view-salones',
  templateUrl: './view-salones.component.html',
  styleUrls: ['./view-salones.component.css']
})
export class ViewSalonesComponent implements OnInit {

  title = 'Salon';
  salones: Salon[]=[];
  edificioId: number=0;

  constructor(private salonService: SalonService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSalonesEdificio();
  }

  getSalonesEdificio(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.salonService.getSalonesEdificio(Number(id)).subscribe(salones=>{
          this.salones=salones
          this.edificioId = Number(id);
        })
      }
    })
  }

}
