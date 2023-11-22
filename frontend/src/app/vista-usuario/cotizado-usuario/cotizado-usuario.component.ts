import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MaterialService } from 'src/app/services/material.service';
import { PersonalService } from 'src/app/services/personal.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Cotizacion } from 'src/app/shared/cotizacion';
import { Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-cotizado-usuario',
  templateUrl: './cotizado-usuario.component.html',
  styleUrls: ['./cotizado-usuario.component.css']
})
export class CotizadoUsuarioComponent implements OnInit{

  idAnalista:string='';
  id:string='';
  solicitudes:Solicitud[]=[];
  material:Material[]=[];
  cotizacion:Cotizacion[]=[];
  vertabla:boolean=true;
  verinformacion:boolean=false;
  infoCotizacion:boolean=false;

  constructor(private rutaActiva: ActivatedRoute,private solicitudesService:SolicitudService,private materialService:MaterialService,
    private cotizacionService:CotizacionService, private comprobanteService:ComprobanteService,private personalService:PersonalService){}
  ngOnInit(): void {
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      this.idAnalista=response.id;
      this.solicitudesService.getCotizadoUsuario(response.id).subscribe((data:Solicitud[])=>{
        this.solicitudes=data;
        this.solicitudes.forEach(item => {
          item.estado = this.isVencida(item);
          console.log('ITEMS: ',item);
        });
      });
    });
  }
  verInfoForm(id:string){
    //this.idSolicitud=id;
    this.materialService.getList(id).subscribe((data: Material[])=>{
      this.material = data;
    });
    this.vertabla=false;
    this.verinformacion=true;
  }
  verCotizacion(id:string){
    this.cotizacionService.getList(id).subscribe((data:Cotizacion[])=>{
      this.cotizacion = data;
    });
    this.verinformacion=false;
    this.infoCotizacion=true;
  }
  //Mapeo de las monedas
  monedaSimbolos: { [key: string]: string } = {
    pesos_mexicanos: 'Mex$ ',
    dolares_usa: 'US$ ',
    euro: '€ ',
  }
  close(valor:boolean){
    this.infoCotizacion=!valor;
    this.verinformacion=valor;
  }
  closedos(valor:boolean){
    this.verinformacion=!valor;
    this.vertabla=valor;
  }
  //para la accion de notificar los estados de la solicitud
  isVencida(item: Solicitud): number {
    const fechaVencimiento = new Date(item.vence);
    const fechaActual = new Date();
    const unDia = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    // Calcula la diferencia en milisegundos entre la fecha de vencimiento y la fecha actual
    const diferencia = fechaVencimiento.getTime() - fechaActual.getTime();

    if (diferencia <= 0) {
      // Si la fecha de vencimiento ha pasado, pinta la fila de rojo
      return -1;
    } else if (diferencia <= unDia) {
      // Si la fecha de vencimiento es en menos de un día, pinta la fila de amarillo
      return 0;
    } else {
      // En cualquier otro caso, no pinta la fila
      return 1;
    }
  }
  updateEstatusVencida(item: Solicitud) {
    if (item.estatus !== 'vencida') {
      item.estatus = 'vencida';
      this.solicitudesService.update(item.id, { estatus: 'vencida' }).subscribe(() => {
        console.log('Estatus actualizado a vencida');
      });
    }
  }

  updateEstatusPorVencer(item: Solicitud) {
    if (item.estatus !== 'porVencer') {
      item.estatus = 'porVencer';
      this.solicitudesService.update(item.id, { estatus: 'porVencer' }).subscribe(() => {
        console.log('Estatus actualizado a por vencer');
      });
    }
  }
  verOne(id:string){
    console.log(id);
    this.comprobanteService.obtenerPDF(id).subscribe((data: Blob) => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank'); // Esto abrirá el PDF en una nueva pestaña
    });
  }
  eliminar(id:string){
    console.log(id)
    this.comprobanteService.eliminarArchivo(id).subscribe(res=>{
      console.log('archivo eliminado correctamente');
    })
  }

}
