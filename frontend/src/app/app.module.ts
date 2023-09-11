import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './inicio/inicio.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { FormSolicitudCComponent } from './vista-usuario/form-solicitud-c/form-solicitud-c.component';

import { VistaAnalistaComponent } from './vista-analista/vista-analista.component';
import { FormCotizacionComponent } from './vista-analista/form-cotizacion/form-cotizacion.component';
import { VistaDirectorComponent } from './vista-director/vista-director.component';
import { RechazadaComponent } from './vista-analista/rechazada/rechazada.component';
import { SoliAprobadaComponent } from './soli-aprobada/soli-aprobada.component';
import { PorCotizarComponent } from './vista-analista/por-cotizar/por-cotizar.component';
import { VencidaComponent } from './vista-analista/vencida/vencida.component';
import { SoporteTIComponent } from './soporte-ti/soporte-ti.component';
import { EditPersonalComponent } from './soporte-ti/edit-personal/edit-personal.component';
import { AddPersonalComponent } from './soporte-ti/add-personal/add-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    VistaUsuarioComponent,
    FormSolicitudCComponent,

    VistaAnalistaComponent,
    FormCotizacionComponent,
    VistaDirectorComponent,
    RechazadaComponent,
    SoliAprobadaComponent,
    PorCotizarComponent,
    VencidaComponent,
    SoporteTIComponent,
    EditPersonalComponent,
    AddPersonalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
