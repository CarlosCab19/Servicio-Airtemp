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
  cotizacion:Cotizacion[]=[];
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
  activarCotizar:string="cotizando";

  //para llevar la cuenta de si todos los materiales ya tienen aunque sea una cotizacion
  contadorListoMaterial:number=0;

  constructor(private solicitudesService:SolicitudService,private materialService:MaterialService,
              private personalService:PersonalService,private rutaActiva: ActivatedRoute,
              private cotizacionService:CotizacionService){}

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
  }

  enviarCotizacion(){
    console.log('el arreglo tiene: ',this.material.length);
    console.log('el contador: ',this.contadorListoMaterial);
  }


  verCotizacion(id:string){
    this.idM=id;
    this.datosCotizar=false;
    this.verFormCotizar=true;
  }
  close(valor:boolean){
    //this.closeForm.emit(valor);
  }
  formCotizacion(valor:boolean){
    this.verFormCotizar=!valor;
    this.datosCotizar=valor;
  }
  regresarAcotizacion(valor:boolean){
    this.verFormCotizar=!valor;
    this.datosCotizar=valor;;

  }
  newEstado(valor:number){
    if (valor !== 0) {
      this.contadorListoMaterial += 1; // Incrementa el contador en 1
    } else if (this.contadorListoMaterial > 0) {
      this.contadorListoMaterial -= 1; // Reduce el contador en 1 si es mayor que 0
    }
    //console.log(this.contadorListoMaterial);
  }

}
