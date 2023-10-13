import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-cotizacion',
  templateUrl: './form-cotizacion.component.html',
  styleUrls: ['./form-cotizacion.component.css']
})
export class FormCotizacionComponent {

  formCotizacion:boolean=false;
  @Input() idSolicitud:string="";

  verCotizacion(){
    this.formCotizacion=true;
  }

}
