import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/shared/solicitud';


@Component({
  selector: 'app-form-solicitud-c',
  templateUrl: './form-solicitud-c.component.html',
  styleUrls: ['./form-solicitud-c.component.css']
})
export class FormSolicitudCComponent implements OnInit{
  //Variables que reciben y envian dalores o datos al componente padre
  solicitar!:Solicitud;
  @Input() idUs:string="";
  @Input() nomResponsable:string="";
  @Output() newEstado = new EventEmitter<boolean>();
  @Output() loadWindows = new EventEmitter<boolean>();
  @Output() abrirForm = new EventEmitter<boolean>();
  @Output() idEmitir = new EventEmitter<string>();


  constructor(public solicitudService:SolicitudService){}

  ngOnInit(): void {
    //interfaz para realizar la solicitud
    this.solicitar={
      id:"",
      id_solicitante:this.idUs,
      solicitante:this.nomResponsable,
      tipo:"",
      codProv:"",
      Rsocial:"",
      NomCliente:"",
      NumParte:"",
      id_analista:"",
      id_director:"",
      vence:"",
      estatus:"Editando",
      created_at:"",
    };

  }
  //se crea la solicitud
  submit(element:Solicitud){
    this.solicitudService.create(this.solicitar).subscribe(res=>{
      console.log('Solicitud realizada');
      //nueva interfaz con todos los datos de la solicitud
      const soliCreada = {
        id:res.id,
        id_solicitante:this.idUs,
        solicitante:this.nomResponsable,
        codProv:element.codProv,
        Rsocial:element.Rsocial,
        NomCliente:element.NomCliente,
        NumParte:element.NumParte,
        vence:element.vence,
        estatus:"Editando",
        created_at:element.created_at,
      }
      //console.log(soliCreada);
      //se deja vacio los datos para otra solicitud
      this.solicitar={
        id:"",
        id_solicitante:this.idUs,
        solicitante:this.nomResponsable,
        tipo:'',
        codProv:'',
        Rsocial:'',
        NomCliente:'',
        NumParte:'',
        id_analista:'',
        id_director:'',
        vence:'',
        estatus:"Editando",
        created_at:'',
      };
      this.addNewIdSoli(res.id);
      this.addEvento(true);
    });
  }
  //metodos que envian y reciben estados o valores
  addNewIdSoli(id:string){
    this.idEmitir.emit(id);
  }
  addNewEstado(value:boolean){
    this.newEstado.emit(value);
  }
  addLoad(value:boolean){
    this.loadWindows.emit(value);
  }
  addEvento(value:boolean){
    this.abrirForm.emit(value);
  }

  nuevoChecked: boolean = false;
  //checkbox para saber si es nuevo el proveedor
  onCheckboxChange() {
    console.log('Estado del checkbox: ', this.nuevoChecked);
  }

}
