import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../shared/personal';
import { Solicitud } from '../shared/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vista-analista',
  templateUrl: './vista-analista.component.html',
  styleUrls: ['./vista-analista.component.css']
})
export class VistaAnalistaComponent implements OnInit{

  //
  isOffcanvasOpen: boolean = false;
  //
  verporCotizar:boolean=true;
  id:string="";
  analista!:Personal;
  idAnalista:string="";
  datosAnalista:string='';
  solicitudes:Solicitud[]=[];
  solicitudesN!:Solicitud;

  formCotizacion:boolean=false;
  idSolicitud:string="";

  form = new FormGroup({
    estatus:  new FormControl('Cotizando', [ Validators.required]),
  })

  constructor(private router: Router,private rutaActiva: ActivatedRoute,private personalService:PersonalService,
    private solicitudesService:SolicitudService){}

  ngOnInit(): void {
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      //console.log(response); // Agrega esta línea para depurar
      this.analista=response;
      this.idAnalista=response.id;
      this.datosAnalista=response.nombres+' '+response.apellidos;
    });
    this.solicitudesService.getNueva().subscribe((data: Solicitud[])=>{
      this.solicitudes = data;
      //console.log(data);
    });
  }
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
  get f(){
    return this.form.controls;
  }
  verFormCoti(id:string){
    this.formCotizacion=true;
    this.idSolicitud=id;
    this.verporCotizar=false;
    /*this.solicitudesService.update(this.idSolicitud, this.form.value).subscribe(res => {
      this.form.setValue(
        {
        'estatus':"Cotizando",
      });
      console.log('estatus cambiado a Cotizando');
    });*/
  }

  closeForm(valor:boolean){
    this.verporCotizar=valor;
    this.formCotizacion=!valor;
    console.log(valor);
  }
  salir(){
    this.router.navigateByUrl('/inicio');
  }

}
