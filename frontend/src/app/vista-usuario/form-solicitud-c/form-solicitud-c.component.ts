import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/shared/solicitud';


@Component({
  selector: 'app-form-solicitud-c',
  templateUrl: './form-solicitud-c.component.html',
  styleUrls: ['./form-solicitud-c.component.css']
})
export class FormSolicitudCComponent implements OnInit{

  solicitar!:Solicitud;
  @Input() idUs:string="";
  @Input() nomResponsable:string="";
  @Output() newEstado = new EventEmitter<boolean>();
  @Output() loadWindows = new EventEmitter<boolean>();


  constructor(public solicitudService:SolicitudService){
  }

  ngOnInit(): void {
    console.log('ngOnInit del formulario');
    this.solicitar={
      id:"",
      id_usuario:this.idUs,
      solicitante:this.nomResponsable,
      codProv:"",
      Rsocial:"",
      NomCliente:"",
      NumParte:"",
      estatus:"Editando",
      created_at:"",
    };

  }

  submit(element:Solicitud){
    this.solicitudService.create(this.solicitar).subscribe(res=>{
      console.log('Solicitud realizada')
      this.solicitar={
        id:"",
        id_usuario:this.idUs,
        solicitante:this.nomResponsable,
        codProv:"",
        Rsocial:"",
        NomCliente:"",
        NumParte:"",
        estatus:"",
        created_at:"",
      };
      this.addNewEstado(false);
      this.addLoad(true);
    });
  }
  addNewEstado(value:boolean){
    this.newEstado.emit(value);
  }
  addLoad(value:boolean){
    this.loadWindows.emit(value);
  }

}
