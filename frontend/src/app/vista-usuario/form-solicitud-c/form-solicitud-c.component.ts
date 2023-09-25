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

  selectedValue: number = 0; // Valor seleccionado del select
  materialClasses: string[] = []; // Arreglo de clases a mostrar

  solicitar!:Solicitud;
  body:boolean=false;
  verEncabezado:boolean=false;
  solicituds:Solicitud[]=[];

  constructor(public solicitudService:SolicitudService){}

  ngOnInit(): void {
    this.solicitudService.getAll().subscribe((data: Solicitud[])=>{
      this.solicituds = data;
      /*console.log(this.personals);*/
    });
  }



  submit(element:Solicitud){

  }
  verbody(){
    this.body=false;
  }
  formEncabezado(){
    this.verEncabezado=true;
  }

}
