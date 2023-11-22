import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../shared/solicitud';
import { Personal } from '../shared/personal';
import { PersonalService } from '../services/personal.service';
import { Material } from '../shared/material';
import { MaterialService } from '../services/material.service';
import { CotizacionService } from '../services/cotizacion.service';
import { Cotizacion } from '../shared/cotizacion';
import { ComprobanteService } from '../services/comprobante.service';

@Component({
  selector: 'app-vista-director',
  templateUrl: './vista-director.component.html',
  styleUrls: ['./vista-director.component.css']
})
export class VistaDirectorComponent implements OnInit{
  isOffcanvasOpen: boolean = false;
  solicitudes:Solicitud[]=[];
  director!:Personal;
  /*para los datos del director*/
  id:string='';
  idDirector:string='';
  datosDirector:string='';

  /*para el material*/
  material:Material[]=[];
  /*para mostrar las diferentes tablas*/
  datosMaterial:boolean=false;
  tablaCotizado:boolean=true;
  datosCotizacion:boolean=false;
  /*para la cotizacion*/
  cotizacion:Cotizacion[]=[];
  agregarEstado!:Cotizacion;

  constructor(private personalS:PersonalService,private solicitudesS:SolicitudService,private rutaActiva: ActivatedRoute,
    private materialS:MaterialService,private cotizacionS:CotizacionService,private comprobanteS:ComprobanteService){}

  ngOnInit(): void {
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalS.find(this.id).subscribe(response=>{
      this.director=response;
      this.idDirector=response.id;
      this.datosDirector=response.nombres+' '+response.apellidos;
    });
    this.solicitudesS.getCotizado().subscribe((data: Solicitud[])=>{
      this.solicitudes = data;
    });
  }
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
  verDatosMaterial(id:string){
    console.log('id de la solicitud: ',id)
    this.materialS.getList(id).subscribe((data: Material[])=>{
      this.material = data;
    });
    this.datosMaterial=true;
    this.tablaCotizado=false;
  }
  verCotizacion(id:string){
    this.cotizacionS.getList(id).subscribe((data:Cotizacion[])=>{
      this.cotizacion = data;
    });
    this.tablaCotizado=false;
    this.datosMaterial=false;
    this.datosCotizacion=true;
  }
  //Mapeo de las monedas
  monedaSimbolos: { [key: string]: string } = {
    pesos_mexicanos: 'Mex$ ',
    dolares_usa: 'US$ ',
    euro: '€ ',
  }
  verOne(id:string){
    console.log(id);
    this.comprobanteS.obtenerPDF(id).subscribe((data: Blob) => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank'); // Esto abrirá el PDF en una nueva pestaña
    });
  }
  close(close:boolean){
    this.datosMaterial=close;
    this.tablaCotizado=!close;
  }
  closeCotizacion(close:boolean){
    this.datosCotizacion=close;
    this.datosMaterial=!close;
  }
  estadoAutorizado:string='Autorizado';
  autorizar(id:string){
    console.log('autorizo: ',id);
    const itemToUpdate = this.cotizacion.find(item => item.id === id);
    if (itemToUpdate) {
      // Actualiza el valor del elemento encontrado
      itemToUpdate.estatus = this.estadoAutorizado;
    }
    this.agregarEstado = {
      id: '',
      id_material:'',
      id_analista:'',
      id_director:'',
      moneda:'',
      fabricacion:'',
      lme:'',
      premium:'',
      total:'',
      icoterm:'',
      estatus: this.estadoAutorizado,
    };
    this.cotizacionS.update(id, this.agregarEstado).subscribe(res => {
      console.log('Cotizacion Autorizada');
      //this.estadoAutorizado = '';
    });
  }
  estadoRechazado:string='Rechazado';
  rechazar(id:string){
    console.log('rechazo: ',id);
    const itemToUpdate = this.cotizacion.find(item => item.id === id);
    if (itemToUpdate) {
      // Actualiza el valor del elemento encontrado
      itemToUpdate.estatus = this.estadoRechazado;
    }
    this.agregarEstado = {
      id: '',
      id_material:'',
      id_analista:'',
      id_director:'',
      moneda:'',
      fabricacion:'',
      lme:'',
      premium:'',
      total:'',
      icoterm:'',
      estatus: this.estadoAutorizado,
    };
    this.cotizacionS.update(id, this.agregarEstado).subscribe(res => {
      console.log('Cotizacion Rechazada');
      //this.estadoAutorizado = '';
    });
  }
  enviarAutorizado(){

  }

}
