import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-analista',
  templateUrl: './vista-analista.component.html',
  styleUrls: ['./vista-analista.component.css']
})
export class VistaAnalistaComponent {
  verporAutorizar:boolean=false;
  verAutorizadas:boolean=false;
  verRechazadas:boolean=false;
  verVencidas:boolean=false;
  constructor(private router: Router){}

  porAutorizar(){
    this.verporAutorizar=true;
    this.verAutorizadas=false;
    this.verRechazadas=false;
    this.verVencidas=false;
  }
  autorizadas(){
    this.verporAutorizar=false;
    this.verAutorizadas=true;
    this.verRechazadas=false;
    this.verVencidas=false;
  }
  rechazadas(){
    this.verporAutorizar=true;
    this.verAutorizadas=false;
    this.verRechazadas=true;
    this.verVencidas=false;
  }
  vencidas(){
    this.verporAutorizar=true;
    this.verAutorizadas=false;
    this.verRechazadas=false;
    this.verVencidas=true;
  }
  salir(){
    this.router.navigateByUrl('/inicio');
  }

}
