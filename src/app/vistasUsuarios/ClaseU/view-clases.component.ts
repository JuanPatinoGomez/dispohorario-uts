import { Component, OnInit } from '@angular/core';
import { ClaseService } from "../../Clase/clase.service";
import { Clase } from "../../Clase/clase";

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-clases',
  templateUrl: './view-clases.component.html',
  styleUrls: ['./view-clases.component.css']
})
export class ViewClasesComponent implements OnInit {

  title = 'Clase';
  clases: Clase[]=[];
  salonId: number=0;

  constructor(private claseService: ClaseService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getClasesSalon();
  }

  getClasesSalon(): void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id = params.get('id');
      if(id){
        this.claseService.getClasesSalon(Number(id)).subscribe(clases=>{
          this.clases=clases
          this.salonId = Number(id);
        })
      }
    })
  }


}
