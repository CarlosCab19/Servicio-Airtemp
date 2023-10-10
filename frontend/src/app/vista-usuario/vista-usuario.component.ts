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


  /*nombre del usuario*/
  responsable:string="";
  idSolicitante:string="";
  idSolicitud:string="";

  /*-----------*/
  id:string="";
  personalN:Personal | undefined;
  solicitudes:Solicitud[]=[];
  idSoli:string="";


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
    this.solicitudService.getList(this.id).subscribe((data: Solicitud[])=>{
      this.solicitudes = data;
    });

  }

  EstadoReci(newEstado:boolean){
    console.log('recibi estado ',newEstado);
    this.verNuevo=newEstado;
    this.verMaterial=newEstado;
    this.verTabla=!newEstado;
  }
  EstadoClose(newClose:boolean){
    this.masInfo=newClose;
    this.verTabla=!newClose;
  }
  loadWindows(winEstado:boolean){
    if(winEstado==true){
      location.reload();
    }
  }

  salir(){
    this.router.navigateByUrl('/inicio');
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

}
