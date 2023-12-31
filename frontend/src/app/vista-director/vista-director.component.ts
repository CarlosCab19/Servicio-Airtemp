import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  verAprobadas:boolean=false;
  /*para la cotizacion*/
  cotizacion:Cotizacion[]=[];
  agregarEstado!:Cotizacion;
  idMaterial:string='';
  idSolicitud:string='';
  /*para el buscador*/
  filtroBusqueda: string = '';

  constructor(private personalS:PersonalService,private solicitudesS:SolicitudService,private rutaActiva: ActivatedRoute,
    private materialS:MaterialService,private cotizacionS:CotizacionService,private comprobanteS:ComprobanteService,private router: Router){}

  ngOnInit(): void {
    //trae datos del usuario y sus solicitudes que han sido aprobadas
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
  //Filtro para el buscador
  filtrarSolicitudes(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();
    return this.solicitudes.filter((solicitud) => {
      return solicitud.id.toString().toLowerCase().includes(valorBusqueda) ||
             solicitud.solicitante.toLowerCase().includes(valorBusqueda) ||
             solicitud.tipo.toLowerCase().includes(valorBusqueda) ||
             solicitud.NomCliente.toLowerCase().includes(valorBusqueda)||
             solicitud.estatus.toLowerCase().includes(valorBusqueda);
    });
  }
  //la interaccion con los componentes y las tablas
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
  //trae los datos del material
  verDatosMaterial(id:string){
    this.idSolicitud=id;
    this.materialS.getList(id).subscribe((data: Material[])=>{
      this.material = data;
    });
    this.datosMaterial=true;
    this.tablaCotizado=false;
  }
  //trae las cotizaciones de cada material
  verCotizacion(id:string){
    this.cotizacionS.getList(id).subscribe((data:Cotizacion[])=>{
      this.cotizacion = data;
    });
    this.tablaCotizado=false;
    this.datosMaterial=false;
    this.datosCotizacion=true;
    this.idMaterial=id;
  }
  //Mapeo de las monedas
  monedaSimbolos: { [key: string]: string } = {
    pesos_mexicanos: 'Mex$ ',
    dolares_usa: 'US$ ',
    euro: '€ ',
  }
  //ver el documento
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
  Aprobadas(valor:boolean){
    this.verAprobadas=valor;
    this.tablaCotizado=!valor;
    this.datosCotizacion=!valor;
    this.datosMaterial=!valor;
    this.closeOffcanvas();
  }
  Cotizadas(valor:boolean){
    this.tablaCotizado=valor;
    this.verAprobadas=!valor;
    this.datosMaterial=!valor;
    this.datosCotizacion=!valor;
    this.closeOffcanvas();
  }
  //metodo para enviar las cotizaciones de todos los materiales
  enviarAutorizado(idDirector:string){
    //console.log('id del director: ',idDirector);
    this.cotizacionS.getList(this.idMaterial).subscribe((data:Cotizacion[])=>{
      this.cotizacion=data;
      //console.log(this.cotizacion);
      const tamaño = this.cotizacion.length;
      //console.log('tamaño del arreglo: ',tamaño);
      //mostramos los datos de cada cotización
      this.cotizacion.forEach((cotizacion)=>{
        //console.log(`ID: ${cotizacion.id}, Estatus: ${cotizacion.estatus}`);
      });
      // Contar la cantidad de cotizaciones con estatus 'Autorizado' después de recibir los datos
      const cotizacionesAutorizadas = this.cotizacion.filter((cotizacion) => cotizacion.estatus === 'Autorizado');
      const cantidadCotizacionesAutorizadas = cotizacionesAutorizadas.length;
      //console.log(`Cantidad de cotizaciones autorizadas: ${cantidadCotizacionesAutorizadas}`);
      if (cantidadCotizacionesAutorizadas === 1) {
        alert('Cotización Autorizada');
        this.materialS.update(this.idMaterial,{estatus:'conAutorizacion'}).subscribe(res=>{
          //console.log('Se actualizo el estatus del material con id: ',this.idMaterial)
        });
        this.closeCotizacion(false);
      } else {
        alert('Autorice una cotización');
      }
    })
  }
  // Lógica para desmarcar los demás elementos cuando se marca una cotizacion a aprobar
  checkChanged(selectedItem: any,idDirector:string) {
    //se itera sobre cada cotizacion para poder actualizar los estatus
    this.cotizacion.forEach(item => {
      if (item !== selectedItem) {
        item.selected = false;
        //console.log('Rechazo:', item.id);
        const itemToUpdate = this.cotizacion.find(cotizacion => cotizacion === item);
        if (itemToUpdate) {
          itemToUpdate.estatus = 'Rechazado';
        }
        this.cotizacionS.update(item.id, { estatus: 'Rechazado',id_director:idDirector }).subscribe(res => {
          //console.log('Cotizaciones rechazadas: ');
        });
      } else {
        item.selected = true;
        //console.log('Autorizo:', item.id);
        const itemToUpdate = this.cotizacion.find(cotizacion => cotizacion === item);
        if (itemToUpdate) {
          itemToUpdate.estatus = 'Autorizado';
        }
        //actualiza el estatus y le agrega el id del director que lo autorizo
        this.cotizacionS.update(item.id, { estatus: 'Autorizado',id_director:idDirector }).subscribe(res => {
          //console.log('Cotizaciones Autorizadas: ');
        });
      }
    });
  }
  EnviarListoAutorizados(idDirector:string){
    this.materialS.getList(this.idSolicitud).subscribe((data:Material[])=>{
      this.material=data;
      const tamaño = this.material.length;
      //console.log('tamaño del arreglo: ',tamaño);
      //mostramos los datos de cada material
      this.material.forEach((material)=>{
        //console.log(`ID: ${material.id}, Estatus: ${material.estatus}`);
      });
      // Contar la cantidad de los materiales con estatus 'conAutorizacion' después de recibir los datos
      const materialesconAutoricion = this.material.filter((material) => material.estatus === 'conAutorizacion');
      const cantidadMaterialesAutorizadas = materialesconAutoricion.length;
      //console.log(`Cantidad de materiales con autorización: ${cantidadMaterialesAutorizadas}`);
      if (this.material.length === materialesconAutoricion.length) {
        alert('Autorización enviada');
        this.solicitudesS.updateDirector(this.idSolicitud,{estatus:'Aprobado',id_director:idDirector}).subscribe(res=>{
          //console.log('Solicitud Autorizada');
          window.location.reload();
        })
      } else {
        alert('Autorice al menos una cotización en cada material')
      }
    })
  }
  salir() {
    // Navegar a la ruta 'inicio'
    this.router.navigate(['/inicio']);
  }

}
