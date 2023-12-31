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
import { CotizadoComponent} from './vista-analista/cotizado/cotizado.component';
import { SoporteTIComponent } from './soporte-ti/soporte-ti.component';
import { EditPersonalComponent } from './soporte-ti/edit-personal/edit-personal.component';
import { AddPersonalComponent } from './soporte-ti/add-personal/add-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MasinfoSoliComponent } from './vista-usuario/masinfo-soli/masinfo-soli.component';
import { SoliNuevaComponent } from './vista-usuario/soli-nueva/soli-nueva.component';
import { RealizarCotizacionComponent } from './vista-analista/form-cotizacion/realizar-cotizacion/realizar-cotizacion.component';
import { SolicitudService } from './services/solicitud.service';
import { CotizadoUsuarioComponent } from './vista-usuario/cotizado-usuario/cotizado-usuario.component';
import { AprobadoComponent } from './vista-director/aprobado/aprobado.component';
import { AprobadoAComponent } from './vista-analista/aprobado-a/aprobado-a.component';
import { SolicitudesComponent } from './soporte-ti/solicitudes/solicitudes.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    VistaUsuarioComponent,
    FormSolicitudCComponent,

    VistaAnalistaComponent,
    FormCotizacionComponent,
    VistaDirectorComponent,
    CotizadoComponent,
    SoporteTIComponent,
    EditPersonalComponent,
    AddPersonalComponent,
    MasinfoSoliComponent,
    SoliNuevaComponent,
    RealizarCotizacionComponent,
    CotizadoUsuarioComponent,
    AprobadoComponent,
    AprobadoAComponent,
    SolicitudesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SolicitudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
