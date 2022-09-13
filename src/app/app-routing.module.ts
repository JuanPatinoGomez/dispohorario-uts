import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaseFormComponent } from './Clase/clase-form.component';
import { ClaseComponent } from './Clase/clase.component';
import { EdificioComponent } from './Edificio/edificio.component';
import { FormEdificioComponent } from './Edificio/form-edificio.component';
import { FromComponent } from './Salon/from.component';
import { SalonComponent } from './Salon/salon.component';
import { FormComponent } from './Sede/form.component';
import { SedeComponent } from './Sede/sede.component';

const routes: Routes = [
  { path: 'sedes', component: SedeComponent},
  { path: 'sedes/form', component: FormComponent},
  { path: 'sedes/form/:id', component: FormComponent},
  { path: 'edificios/sede/:id', component: EdificioComponent},
  { path: 'edificios/sede/:idsede/form', component: FormEdificioComponent},
  { path: 'edificios/sede/:idsede/form/:id', component: FormEdificioComponent},
  { path: 'salones/edificio/:id', component: SalonComponent},
  { path: 'salones/edificio/:idedificio/form', component: FromComponent}, //Formulario de salon
  { path: 'salones/edificio/:idedificio/form/:id', component: FromComponent}, //Formulario de salon
  { path: 'clases/salon/:id', component: ClaseComponent},
  { path: 'clases/salon/:idsalon/form', component: ClaseFormComponent}, //Formulario de salon
  { path: 'clases/salon/:idsalon/form/:id', component: ClaseFormComponent}, //Formulario de salon
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }