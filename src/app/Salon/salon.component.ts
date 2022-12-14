import { Component, OnInit } from '@angular/core';
import { Salon } from "./salon";
import { SalonService } from "./salon.service";

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

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

delete(salon: Salon): void{
  this.salonService.delete(salon).subscribe({
    next: () => {
      this.salones = this.salones.filter(edi => edi != salon)
    }
  });
}

}
