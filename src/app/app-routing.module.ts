import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaseFormComponent } from './Clase/clase-form.component';
import { ClaseComponent } from './Clase/clase.component';
import { EdificioComponent } from './Edificio/edificio.component';
import { FormEdificioComponent } from './Edificio/form-edificio.component';
import { LoginComponent } from './manejoUsuario/login/login.component';
import { FormUsuariosComponent } from './manejoUsuario/Usuario/form-usuarios.component';
import { UsuarioComponent } from './manejoUsuario/Usuario/usuario.component';
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
  //panel administrativo
  { path: 'admin/sedes', component: SedeComponent},
  { path: 'admin/sedes/form', component: FormComponent},
  { path: 'admin/sedes/form/:id', component: FormComponent},
  { path: 'admin/edificios/sede/:id', component: EdificioComponent},
  { path: 'admin/edificios/sede/:idsede/form', component: FormEdificioComponent},
  { path: 'admin/edificios/sede/:idsede/form/:id', component: FormEdificioComponent},
  { path: 'admin/salones/edificio/:id', component: SalonComponent},
  { path: 'admin/salones/edificio/:idedificio/form', component: FromComponent}, //Formulario de salon
  { path: 'admin/salones/edificio/:idedificio/form/:id', component: FromComponent}, //Formulario de salon
  { path: 'admin/clases/salon/:id', component: ClaseComponent},
  { path: 'admin/clases/salon/:idsalon/form', component: ClaseFormComponent}, //Formulario de salon
  { path: 'admin/clases/salon/:idsalon/form/:id', component: ClaseFormComponent}, //Formulario de salon
  //login
  { path: 'login', component: LoginComponent},
  //Control de usuarios
  { path: 'admin/usuarios', component: UsuarioComponent},
  { path: 'admin/usuarios/form', component: FormUsuariosComponent},
  //las vistas que ve el usuario
  { path: 'view/sedes', component: ViewSedeComponent},
  { path: 'view/edificios/sede/:id', component: ViewEdificiosComponent},
  { path: 'view/salones/edificio/:id', component: ViewSalonesComponent},
  { path: 'view/clases/salon/:id', component: ViewClasesComponent},
  //modulo qr
  { path: 'admin/moduloqr', component: ModuloqrComponent},
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
