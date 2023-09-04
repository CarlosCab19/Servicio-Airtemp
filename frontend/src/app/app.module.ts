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


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    VistaUsuarioComponent,
    FormSolicitudCComponent,
    VistaAnalistaComponent,
    FormCotizacionComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
