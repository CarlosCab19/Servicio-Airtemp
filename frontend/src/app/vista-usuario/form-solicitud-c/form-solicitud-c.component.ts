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
  @Output() abrirForm = new EventEmitter<boolean>();

  @Output() idEmitir = new EventEmitter<string>();

  verprueva:boolean=false;
  solici:Solicitud[]=[];
  codiProv:string="";
  Rsocial:string="";
  nomClien:string="";
  numParte:string="";

  constructor(public solicitudService:SolicitudService){}


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
      console.log('Solicitud realizada');
      const soliCreada = {
        id:res.id,
        id_usuario:this.idUs,
        solicitante:this.nomResponsable,
        codProv:element.codProv,
        Rsocial:element.Rsocial,
        NomCliente:element.NomCliente,
        NumParte:element.NumParte,
        estatus:"Editando",
        created_at:element.created_at,
      }
      console.log(soliCreada);

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
      this.addNewIdSoli(res.id);
      /*this.addLoad(true);*/
      this.addEvento(true);
      //console.log(res);
    });
  }
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

  onCheckboxChange() {
    console.log('Estado del checkbox: ', this.nuevoChecked);
    // Aquí puedes llamar a otros métodos o realizar acciones en función del valor del checkbox.
  }

}
