import { Component, Input, OnInit } from '@angular/core';
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
  @Input() id:string="";

  constructor(private solicitudesS:SolicitudService,private materialeS:MaterialService,private cotizacionS:CotizacionService){}

  ngOnInit(): void {
    this.solicitudesS.getAprobadoDirector(this.id).subscribe((data:Solicitud[])=>{
      this.solicitudes=data;
    })
  }
  Informacion(id:string){
    this.materialeS.getList(id).subscribe((data:Material[])=>{
      this.material=data;
    })
  }

}
