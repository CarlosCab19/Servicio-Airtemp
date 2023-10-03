import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';


@Component({
  selector: 'app-form-solicitud-c',
  templateUrl: './form-solicitud-c.component.html',
  styleUrls: ['./form-solicitud-c.component.css']
})
export class FormSolicitudCComponent implements OnInit{

  @Input() idSolicitante:string="";
  selectedValue: number = 0; // Valor seleccionado del select
  materialClasses: string[] = []; // Arreglo de clases a mostrar
  solicitudSeleccionadaId: string | null = null;
  /*para desabilitar material*/
  id_solicitud:string="";

  solicitar!:Solicitud;
  body:boolean=false;
  verEncabezado:boolean=false;
  solicituds:Solicitud[]=[];
  estatus:string="";

  constructor(public solicitudService:SolicitudService){}

  ngOnInit(): void {
    /*Filtrar las solicitudes de cada usuario o solicitante*/
    this.solicitudService.getAll().subscribe(response=>{
      response.forEach(element => {
        if (element.id_usuario==this.idSolicitante) {
          this.solicituds.push(element);
        }
      });
    });
    this.solicitar={
      id:"",
      id_usuario:this.idSolicitante,
      estatus:"",
      id_proveedor:"",
      id_cliente:"",
      created_at:"",
    };

  }



  submit(element:Solicitud){
    this.solicitudService.create(this.solicitar).subscribe(res=>{
      console.log('Solicitud realizada')
    });
    this.verEncabezado=false;
  }
  verbody(){
    this.body=false;
  }
  formEncabezado(){
    this.verEncabezado=true;
  }
  mostrarFormulario(solicitudId: string) {
    this.solicitudSeleccionadaId = solicitudId;
  }
  cancelar(){
    this.verEncabezado=false;
  }

}
