import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-form-cotizacion',
  templateUrl: './form-cotizacion.component.html',
  styleUrls: ['./form-cotizacion.component.css']
})
export class FormCotizacionComponent implements OnInit{

  formCotizacion:boolean=false;
  //varibles para enviar y recibir datos
  @Input() idSolicitud:string="";
  @Output() closeForm = new EventEmitter<boolean>();

  solicitudesN!:Solicitud;
  solicitud:Solicitud[]=[];
  materialesN!:Material;
  material:Material[]=[];
  //variables para los datos de la solicitud
  responsableSoli:string="";
  codigo:string="";
  Rsocial:string="";
  NomCliente:string="";
  NumParte:string="";
  //variables para los materiales
  descripcion:string="";
  familia:string="";
  caracter1:string="";
  caracter2:string="";

  constructor(private solicitudesService:SolicitudService,private materialService:MaterialService){}

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
  }
  verCotizacion(){
    this.formCotizacion=true;
  }
  close(valor:boolean){
    this.closeForm.emit(valor);
  }

}
