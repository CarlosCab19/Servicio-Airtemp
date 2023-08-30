import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './inicio/inicio.component';
import { LoginUsuarioComponent } from './inicio/login-usuario/login-usuario.component';
import { LoginAdministradorComponent } from './inicio/login-administrador/login-administrador.component';
import { LoginDirectorComponent } from './inicio/login-director/login-director.component';
import { LoginTiComponent } from './inicio/login-ti/login-ti.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginUsuarioComponent,
    LoginAdministradorComponent,
    LoginDirectorComponent,
    LoginTiComponent
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
