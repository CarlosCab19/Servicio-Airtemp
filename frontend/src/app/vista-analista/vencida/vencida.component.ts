import { Component } from '@angular/core';

@Component({
  selector: 'app-vencida',
  templateUrl: './vencida.component.html',
  styleUrls: ['./vencida.component.css']
})
export class VencidaComponent {
  verNuevo:boolean=false;
  verMaterial:boolean=false;
  verTabla:boolean=false;
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
