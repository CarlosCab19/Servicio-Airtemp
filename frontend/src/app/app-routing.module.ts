import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

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
import { MasinfoSoliComponent } from './vista-usuario/masinfo-soli/masinfo-soli.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { SoliNuevaComponent } from './vista-usuario/soli-nueva/soli-nueva.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'inicio',component:InicioComponent},
  {path:'solicitante/:id',component:VistaUsuarioComponent},
  {path:'formSolicitud',component:FormSolicitudCComponent},
  {path:'analista/:id',component:VistaAnalistaComponent},
  {path:'formCotizacion',component:FormCotizacionComponent},
  {path:'director/:id',component:VistaDirectorComponent},
  {path:'cotizacionRechazada',component:RechazadaComponent},
  {path:'aprobados',component:SoliAprobadaComponent},
  {path:'porCotizar',component:PorCotizarComponent},
  {path:'soporte/:id',component:SoporteTIComponent},
  {path:'editPersonal/:id',component:EditPersonalComponent},
  {path:'addPersonal',component:AddPersonalComponent},
  {path:'infoSolicitud',component:MasinfoSoliComponent},
  {path:'solinueva',component:SoliNuevaComponent},
  {path:'vencidas',component:VencidaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
