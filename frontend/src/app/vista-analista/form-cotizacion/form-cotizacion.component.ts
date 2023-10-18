import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MaterialService } from 'src/app/services/material.service';
import { PersonalService } from 'src/app/services/personal.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Cotizacion } from 'src/app/shared/cotizacion';
import { Material } from 'src/app/shared/material';
import { Personal } from 'src/app/shared/personal';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-form-cotizacion',
  templateUrl: './form-cotizacion.component.html',
  styleUrls: ['./form-cotizacion.component.css']
})
export class FormCotizacionComponent implements OnInit{

  datosCotizar:boolean=true;
  //varibles para enviar y recibir datos
  @Input() idSolicitud:string="";
  @Output() closeForm = new EventEmitter<boolean>();

  solicitudesN!:Solicitud;
  materialesN!:Material;
  material:Material[]=[];
  personalN!:Personal;
  idM:string="";
  //id para el analista
  id:string="";
  //variables para los datos de la solicitud
  responsableSoli:string="";
  codigo:string="";
  Rsocial:string="";
  NomCliente:string="";
  NumParte:string="";

  idAnalista:string="";
  nomAnalista:string="";
  //para ver el formulario de la cotizacion
  verFormCotizar:boolean=false;

  constructor(private solicitudesService:SolicitudService,private materialService:MaterialService,
              private cotizacionService:CotizacionService,private personalService:PersonalService,
              private rutaActiva: ActivatedRoute){}

  ngOnInit(): void {
    this.solicitudesService.find(this.idSolicitud).subscribe(response=>{
      this.solicitudesN=response;
      this.responsableSoli=response.solicitante;
      this.codigo=response.codProv;
      this.Rsocial=response.Rsocial;
      this.NomCliente=response.NomCliente;
      this.NumParte=response.NumParte;
    });
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
    });
    /*para trer un personal por su id y buscar sus nombres y apellidos*/
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      this.personalN=response;
      this.idAnalista=response.id;
      this.nomAnalista=response.nombres + " " + response.apellidos;
    });
    console.log(this.verFormCotizar);
  }


  verCotizacion(id:string){
    this.idM=id;
    this.datosCotizar=false;
    this.verFormCotizar=true;
    console.log(this.verFormCotizar);
  }
  close(valor:boolean){
    this.closeForm.emit(valor);
  }


}
