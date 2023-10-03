import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Personal } from 'src/app/shared/personal';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-soli-nueva',
  templateUrl: './soli-nueva.component.html',
  styleUrls: ['./soli-nueva.component.css'],
  providers: [DatePipe], // Añade DatePipe a los providers
})
export class SoliNuevaComponent implements OnInit{
  @Input() idSolicitante:string="";
  @Input() nombreSolicitante:string="";
  @Input() apellidoSoli:string="";
  solicituds:Solicitud[]=[];
  masInformacion:boolean=false;
  infoSelec:string | null= null;

  constructor(private readonly solicitudes:SolicitudService, public datePipe: DatePipe){}
  ngOnInit(): void {
    /*trae las solicitudes que son de cada usuario*/
    this.solicitudes.getAll().subscribe(response=>{
      response.forEach(element => {
        if (element.id_usuario==this.idSolicitante) {
          this.solicituds.push(element);
        }
      });
    });
  }

  masInfo(solicitudId:any){
    this.infoSelec = solicitudId;
    this.masInformacion=!this.masInformacion;
  }

  // Función para formatear la fecha
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }

}
