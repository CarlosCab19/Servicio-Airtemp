import { Component, Input, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Cotizacion } from 'src/app/shared/cotizacion';

@Component({
  selector: 'app-realizar-cotizacion',
  templateUrl: './realizar-cotizacion.component.html',
  styleUrls: ['./realizar-cotizacion.component.css']
})
export class RealizarCotizacionComponent implements OnInit{

  //datos a recibir de form-cotizacion
  activarForm:boolean=false;

  cotizar!:Cotizacion;
  cotizacion:Cotizacion[]=[];

  formCotizacion:boolean=false;

  constructor(private cotizacionService:CotizacionService){}

  ngOnInit(): void {

  }
  submit(valor:Cotizacion){

  }
  closeCotizacion(){
    this.formCotizacion=false;
  }

}
