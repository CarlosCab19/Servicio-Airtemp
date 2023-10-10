import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-masinfo-soli',
  templateUrl: './masinfo-soli.component.html',
  styleUrls: ['./masinfo-soli.component.css'],
  providers: [DatePipe],
})
export class MasinfoSoliComponent implements OnInit{
  @Input() idSolicitud:string="";
  @Input() responsable:string="";
  @Output() newClose = new EventEmitter<boolean>();
  material:Material[]=[];
  solicitar!:Material;
  solicitud!:Solicitud;
  codiProv:string="";
  Rsocial:string="";
  nomClien:string="";
  numParte:string="";
  addMaterial:boolean=false;
  contMaterial!:boolean;

  fecha:Date|string="";
  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,
    private materialService:MaterialService,private datePipe: DatePipe){}

  ngOnInit(): void {
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
      // Verifica si el arreglo this.material está vacío
  if (this.material.length === 0) {
    console.log('El arreglo this.material está vacío.');
    this.contMaterial=true;
  } else {
    console.log('El arreglo this.material no está vacío y contiene elementos.');
    this.contMaterial=false;
  }
    });
    this.solicitudService.find(this.idSolicitud).subscribe(response=>{
      this.solicitud=response;
      this.codiProv=response.codProv;
      this.Rsocial=response.Rsocial;
      this.nomClien=response.NomCliente;
      this.numParte=response.NumParte;
    });
    this.solicitar={
      id:"",
      id_solicitud:this.idSolicitud,
      descripcion:"",
      familia:"",
      caracterone:"",
      caractertwo:"",
    }
  }
  submit(element:Material){
    this.materialService.create(this.solicitar).subscribe(res=>{
      this.material.push(element);
      console.log('Material Agregado');
      // Limpia los campos del objeto 'solicitar'
    this.solicitar = {
      id: "",
      id_solicitud: this.idSolicitud,
      descripcion: "",
      familia: "",
      caracterone: "",
      caractertwo: ""
    };
    });
  }
  addNewClose(value:boolean){
    this.newClose.emit(value);
  }
  eliminar(idMaterial:string){
    this.materialService.delete(idMaterial).subscribe(res=>{
      this.material = this.material.filter(item => item.id !== idMaterial);
      console.log('Material Eliminado');
    })
  }
  EnviarSoli(){
    if(this.contMaterial==true){
      alert('Sin materiales, Agregar al menos uno');
    }else{
      alert('Enviado');
    }
  }
  masMaterial(){
    this.addMaterial=!this.addMaterial;
  }
}
