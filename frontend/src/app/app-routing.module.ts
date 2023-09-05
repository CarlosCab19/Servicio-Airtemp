import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { VistaUsuarioComponent } from './vista-usuario/vista-usuario.component';
import { FormSolicitudCComponent } from './vista-usuario/form-solicitud-c/form-solicitud-c.component';
import { VistaAnalistaComponent } from './vista-analista/vista-analista.component';
import { FormCotizacionComponent } from './vista-analista/form-cotizacion/form-cotizacion.component';
import { VistaDirectorComponent } from './vista-director/vista-director.component';
import { RechazadaComponent } from './vista-analista/rechazada/rechazada.component';


const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'inicio',component:InicioComponent},
  {path:'vistaUsuario',component:VistaUsuarioComponent},
  {path:'formSolicitud',component:FormSolicitudCComponent},
  {path:'vistaAnalista',component:VistaAnalistaComponent},
  {path:'formCotizacion',component:FormCotizacionComponent},
  {path:'vistaDirector',component:VistaDirectorComponent},
  {path:'cotizacionRechazada',component:RechazadaComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
