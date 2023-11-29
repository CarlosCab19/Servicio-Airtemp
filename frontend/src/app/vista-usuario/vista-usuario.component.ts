import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../shared/personal';
import { Solicitud } from '../shared/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit{
  /*lo que se va quedar*/
  verNuevo:boolean=false;
  verMaterial:boolean=false;
  verTabla:boolean=true;
  isOffcanvasOpen: boolean = false;
  masInfo:boolean=false;
  filtroBusqueda: string = '';

  /*nombre del usuario*/
  responsable:string="";
  idSolicitante:string="";
  idSolicitud:string="";

  /*-----------*/
  id:string="";
  personalN:Personal | undefined;
  solicitudes:Solicitud[]=[];
  solicitud!:Solicitud;
  idSoli:string="";

  /*para saber el estado y poder bloquear*/
  estatuSolicitud:string="";

  /*ver tabla de cotizados*/
  verCotizados:boolean=false;

  constructor(private router: Router,private rutaActiva: ActivatedRoute,
      private personalService:PersonalService, private solicitudService:SolicitudService){}

  ngOnInit(): void {
    /*para trer un personal por su id y buscar sus nombres y apellidos*/
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      this.personalN=response;
      this.idSolicitante=response.id;
      this.responsable=response.nombres + " " + response.apellidos;
    });
    this.solicitudService.getListNueva(this.id).subscribe((data: Solicitud[])=>{
      this.solicitudes = data;
    });

  }
  filtrarSolicitudes(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();
    return this.solicitudes.filter((solicitud) => {
      // Puedes ajustar la lógica de filtrado según tus necesidades
      return solicitud.id.toString().toLowerCase().includes(valorBusqueda) ||
             solicitud.solicitante.toLowerCase().includes(valorBusqueda) ||
             solicitud.tipo.toLowerCase().includes(valorBusqueda) ||
             //solicitud.codProv.toLowerCase().includes(valorBusqueda) ||
             solicitud.NomCliente.toLowerCase().includes(valorBusqueda)||
             solicitud.estatus.toLowerCase().includes(valorBusqueda);
    });
  }

  idReci(id_Reci:string){
    this.idSoli=id_Reci;
  }

  EstadoReci(newEstado:boolean){
    this.verNuevo=newEstado;
    this.verMaterial=newEstado;
    this.verTabla=!newEstado;
  }
  EstadoClose(newClose:boolean){
    this.masInfo=newClose;
    if(newClose==false){
      location.reload();
    }
    this.verTabla=!newClose;
  }
  loadWindows(winEstado:boolean){
    if(winEstado==true){
      location.reload();
    }
  }
  activarForm(actForm:boolean){
    this.masInfo=actForm;
    this.verTabla=!actForm;
    this.verNuevo=!actForm;
  }
  EstadoSoli(newEstSoli:boolean){
    this.verTabla=newEstSoli;
    this.masInfo=!newEstSoli;
    if(newEstSoli==true){
      location.reload();
    }
  }

  salir(){
    this.router.navigate(['/inicio']);
  }
  /*lo que se va quedar*/
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
  Nuevo(){
    this.verNuevo=true;
    this.verTabla=false;
    this.verMaterial=false;
    this.masInfo=false;
    this.verCotizados=false;
  }
  closeForm(){
    this.verNuevo=false;
    this.verTabla=true;
  }
  closeMaterial(){
    this.verMaterial=false;
    this.verTabla=true;
  }
  Tabla(){
    this.verTabla=true;
    this.closeOffcanvas();
    this.verNuevo=false;
    this.verMaterial=false;
    this.masInfo=false;
    this.verCotizados=false;
  }

  formMaterial(idSelec:string){
    this.idSolicitud=idSelec;
    this.verMaterial=true;
    this.verTabla=false;
  }
  masInformacion(idSoli:string){
    this.masInfo=true;
    this.verTabla=false;
    this.idSoli=idSoli;
  }
  cancelar(id:string){
    this.solicitudService.find(id).subscribe(response=>{
      this.solicitud=response;
      this.estatuSolicitud=response.estatus;
    });
  }
  Cotizadas(valor:boolean){
    this.verCotizados=valor;
    this.verTabla=false;
    this.closeOffcanvas();
  }

}
