import { Component, OnInit } from '@angular/core';
import { EdificioService } from "./edificio.service";
import { Edificio } from "./edificio";

import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html',
  styleUrls: ['./edificio.component.css']
})
export class EdificioComponent implements OnInit {

  title = 'Edificio';
  edificios: Edificio[]=[];
  sedeId: number=0;

  constructor(private edificioService: EdificioService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
      this.userLogin();
  }

  userLogin() {
    console.log(sessionStorage.getItem('user') === null)
    if(sessionStorage.getItem('user') === null){
      console.log(sessionStorage.getItem('user') === null)
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getEdificiosSedes();
  }

  getEdificiosSedes(): void{
      this.activatedRouter.paramMap.subscribe(params=>{
        let id = params.get('id');
        if(id){
          this.edificioService.getEdificiosSedes(Number(id)).subscribe(edificios=>{
            this.edificios=edificios
            this.sedeId = Number(id);
          })
        }
      })
  }

  delete(edificio: Edificio): void{
    this.edificioService.delete(edificio).subscribe({
      next: () => {
        this.edificios = this.edificios.filter(edi => edi != edificio)
      }
    });
  }

}
