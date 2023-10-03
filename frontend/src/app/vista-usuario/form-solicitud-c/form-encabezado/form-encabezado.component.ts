import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-form-encabezado',
  templateUrl: './form-encabezado.component.html',
  styleUrls: ['./form-encabezado.component.css']
})
export class FormEncabezadoComponent implements OnInit{
  @Input() solicitudId:string="";
  @Output() newEstado = new EventEmitter<boolean>();
  solicitar!:Material;
  constructor(private materialService:MaterialService){}

  ngOnInit(): void {
    this.solicitar={
      id:"",
      id_solicitud:this.solicitudId,
      id_cotizacion:"",
      descripcion:"",
      familia:"",
      caracterone:"",
      caractertwo:"",
    }
  }
  submit(element:Material){
    this.materialService.create(this.solicitar).subscribe(res=>{
      console.log('Material Agregado');
      // Limpia los campos del objeto 'solicitar'
    this.solicitar = {
      id: "",
      id_solicitud: this.solicitudId,
      id_cotizacion: "",
      descripcion: "",
      familia: "",
      caracterone: "",
      caractertwo: ""
    };
    });
  }
  addNewEstado(value: boolean){
    this.newEstado.emit(value);
  }

}
