import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-vencida',
  templateUrl: './vencida.component.html',
  styleUrls: ['./vencida.component.css']
})
export class VencidaComponent implements OnInit{

  tablaData: Solicitud[]=[];

  constructor(private solicitudes:SolicitudService){}
  private  nuevoSubscription:Subscription | undefined;

  ngOnInit() {
    this.solicitudes.getAll().subscribe(
      (data) => {
        this.tablaData = data;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
    this.nuevoSubscription = this.solicitudes.getObservable().subscribe((solicitud)=>{
      console.log(solicitud);
      /*this.tablaData.push(solicitud);*/
      this.solicitudes.getAll().subscribe(
        (data) => {
          this.tablaData = data;
        },
        (error) => {
          console.error('Error al obtener datos:', error);
        }
      );
    })
  }
  verNuevo:boolean=false;
  verMaterial:boolean=false;
  verTabla:boolean=true;
  isOffcanvasOpen: boolean = false;

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
  formMaterial(){
    this.verMaterial=true;
    this.verTabla=false;
  }
}
