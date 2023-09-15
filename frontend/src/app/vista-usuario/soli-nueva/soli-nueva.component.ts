import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Personal } from 'src/app/shared/personal';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-soli-nueva',
  templateUrl: './soli-nueva.component.html',
  styleUrls: ['./soli-nueva.component.css']
})
export class SoliNuevaComponent implements OnChanges{
  solicituds:Solicitud[]=[];
  masInformacion:boolean=false;

  @Input() id:string="";
  @Input() nombre:string="";
  @Input() actualizar: boolean = false;

  constructor(private readonly solicitudes:SolicitudService){}

  ngOnChanges(changes: SimpleChanges): void {
    /*this.solicitudes.getAll().subscribe(response=>{
      response.forEach(element => {
        if(element.id_solicitante==this.id){
          this.solicituds.push(element);
        }
      })
    })*/
    this.solicitudes.getAll().subscribe((data: Solicitud[])=>{
      this.solicituds = data;
    });
  }
  masInfo(){
    this.masInformacion=!this.masInformacion;
  }

}
