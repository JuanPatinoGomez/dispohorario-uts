import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SedeComponent } from './Sede/sede.component';
import { FormComponent } from './Sede/form.component';
import { EdificioComponent } from './Edificio/edificio.component';
import { FormEdificioComponent } from './Edificio/form-edificio.component';
import { SalonComponent } from './Salon/salon.component';
import { FromComponent } from './Salon/from.component';
import { ClaseComponent } from './Clase/clase.component';
import { ClaseFormComponent } from './Clase/clase-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SedeComponent,
    FormComponent,
    EdificioComponent,
    FormEdificioComponent,
    SalonComponent,
    FromComponent,
    ClaseComponent,
    ClaseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
