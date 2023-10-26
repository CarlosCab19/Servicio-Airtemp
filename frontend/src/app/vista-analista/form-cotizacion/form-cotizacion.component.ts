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
    this.material.forEach((material) => {
      console.log(`ID: ${material.id}, Estatus: ${material.estatus}`);
    });
    const materialesListos = this.material.filter(material => material.estatus === 'Listo');
    const cantidadMaterialesListos = materialesListos.length;
    console.log(`Cantidad de materiales Listos: ${cantidadMaterialesListos}`);

  }


  verCotizacion(id:string){
    this.idM=id;
    this.datosCotizar=false;
    this.verFormCotizar=true;
  }
  close(valor:boolean){
    this.closeForm.emit(valor);
  }
  formCotizacion(valor:boolean){
    this.verFormCotizar=!valor;
    this.datosCotizar=valor;
  }
  regresarAcotizacion(valor:boolean){
    this.verFormCotizar=!valor;
    this.datosCotizar=valor;;

  }
  Color:string="";
  newEstado(valor:string){
    console.log('valor: ',valor);
  }

}
