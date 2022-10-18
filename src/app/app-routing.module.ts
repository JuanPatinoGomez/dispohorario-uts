import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaseFormComponent } from './Clase/clase-form.component';
import { ClaseComponent } from './Clase/clase.component';
import { EdificioComponent } from './Edificio/edificio.component';
import { FormEdificioComponent } from './Edificio/form-edificio.component';
import { ModuloqrComponent } from './moduloqr/moduloqr.component';
import { FromComponent } from './Salon/from.component';
import { SalonComponent } from './Salon/salon.component';
import { FormComponent } from './Sede/form.component';
import { SedeComponent } from './Sede/sede.component';
import { ViewClasesComponent } from './vistasUsuarios/ClaseU/view-clases.component';
import { ViewEdificiosComponent } from './vistasUsuarios/EdificiosU/view-edificios.component';
import { ViewSalonesComponent } from './vistasUsuarios/SalonU/view-salones.component';
import { ViewSedeComponent } from './vistasUsuarios/SedeU/view-sede.component';

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
  //las vistas que ve el usuario
  { path: 'view/sedes', component: ViewSedeComponent},
  { path: 'view/edificios/sede/:id', component: ViewEdificiosComponent},
  { path: 'view/salones/edificio/:id', component: ViewSalonesComponent},
  { path: 'view/clases/salon/:id', component: ViewClasesComponent},
  //modulo qr
  { path: 'moduloqr', component: ModuloqrComponent},
  { path: '', component: ModuloqrComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
