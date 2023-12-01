import { Component, Input, OnInit } from '@angular/core';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Cotizacion } from 'src/app/shared/cotizacion';
import { Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-aprobado',
  templateUrl: './aprobado.component.html',
  styleUrls: ['./aprobado.component.css']
})
export class AprobadoComponent implements OnInit{

  solicitudes:Solicitud[]=[];
  material:Material[]=[];
  cotizacion:Cotizacion[]=[];
  @Input() id:string='';
  @Input() filtroBusqueda:string='';

  /*para ver las demas tablas*/
  descripcionMaterial:boolean=false;
  tablaPrincipal:boolean=true;

  constructor(private solicitudesS:SolicitudService,private materialeS:MaterialService,private cotizacionS:CotizacionService,
    private comprobanteService:ComprobanteService){}

  ngOnInit(): void {
    this.solicitudesS.getAprobadoDirector(this.id).subscribe((data:Solicitud[])=>{
      this.solicitudes=data;
    })
  }
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
  Informacion(id:string){
    this.materialeS.getList(id).subscribe((data:Material[])=>{
      this.material=data;
    });
    this.descripcionMaterial=true;
    this.tablaPrincipal=false;
  }
  close(valor:boolean){
    this.descripcionMaterial = !valor;
    this.tablaPrincipal = valor;
  }
  verCotizacion(id:string){
    this.cotizacionS.getList(id).subscribe((data:Cotizacion[])=>{
      this.cotizacion=data;
    })
  }
   //Mapeo de las monedas
  monedaSimbolos: { [key: string]: string } = {
    pesos_mexicanos: 'Mex$ ',
    dolares_usa: 'US$ ',
    euro: '€ ',
  }
  verOne(id:string){
    console.log(id);
    this.comprobanteService.obtenerPDF(id).subscribe((data: Blob) => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank'); // Esto abrirá el PDF en una nueva pestaña
    });
  }

}
