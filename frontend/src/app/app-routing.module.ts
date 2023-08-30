import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginUsuarioComponent } from './inicio/login-usuario/login-usuario.component';
import { LoginAdministradorComponent } from './inicio/login-administrador/login-administrador.component';
import { LoginDirectorComponent } from './inicio/login-director/login-director.component';
import { LoginTiComponent } from './inicio/login-ti/login-ti.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'inicio',component:InicioComponent},
  {path:'login/usuario',component:LoginUsuarioComponent},
  {path:'login/administrador',component:LoginAdministradorComponent},
  {path:'login/director',component:LoginDirectorComponent},
  {path:'login/ti',component:LoginTiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
