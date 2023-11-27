import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Personal } from 'src/app/shared/personal';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-soli-nueva',
  templateUrl: './soli-nueva.component.html',
  styleUrls: ['./soli-nueva.component.css'],
  providers: [DatePipe], // Añade DatePipe a los providers
  /*changeDetection: ChangeDetectionStrategy.OnPush,*/
})
export class SoliNuevaComponent implements OnInit{
  @Input() idSolicitante:string="";
  @Input() nombreSolicitante:string="";
  @Input() apellidoSoli:string="";
  solicituds:Solicitud[]=[];
  masInformacion:boolean=false;
  infoSelec:string | null= null;
  responseN:string="";
  id:string="4";

  constructor(private readonly solicitudes:SolicitudService, public datePipe: DatePipe,
    private cdr:ChangeDetectorRef){
      console.log('Entra en el contructor');
    }
  ngOnInit(): void {
    console.log('Entra en el OnInit');
    /*trae las solicitudes que son de cada usuario*/
    this.solicitudes.getAll().subscribe(response=>{
      response.forEach(element => {
        if (element.id_solicitante==this.idSolicitante) {
          this.solicituds.push(element);
        }
      });
    });
  }



  masInfo(solicitudId:any){
    this.infoSelec = solicitudId;
    this.masInformacion=true;
  }
  addEstado(newEstado:boolean){
    this.masInformacion=newEstado;
  }
  addRespuesta(newRespuesta:string){
    this.responseN=newRespuesta;
  }



  // Función para formatear la fecha
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }

}
