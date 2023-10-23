import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FamiliaService } from 'src/app/services/familia.service';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Familia, Material } from 'src/app/shared/material';
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
  /*@Input() Rsocial:string="";
  @Input() codiProv:string="";
  @Input() nomClien:string="";
  @Input() numParte:string="";*/
  @Output() newClose = new EventEmitter<boolean>();
  @Output() newEnviar = new EventEmitter<boolean>();

  Rsocial:string="";
  codiProv:string="";
  nomClien:string="";
  numParte:string="";
  Estatus:string="";

  familia:Familia[]=[];
  material:Material[]=[];
  solicitar!:Material;
  solicitud!:Solicitud;
  addMaterial:boolean=false;
  contMaterial!:boolean;

  form = new FormGroup({
    estatus:  new FormControl('Nueva', [ Validators.required]),
  });


  fecha:Date|string="";
  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,
    private materialService:MaterialService, private familiaService:FamiliaService ){}

  ngOnInit(): void {
    //para traer los meteriales de esa solictud
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
    });

    this.solicitudService.find(this.idSolicitud).subscribe(response=>{
      //console.log('entro en donde se recuperan los datos de la solicitud')
      this.solicitud=response;
      this.codiProv=response.codProv;
      this.Rsocial=response.Rsocial;
      this.nomClien=response.NomCliente;
      this.numParte=response.NumParte;
      this.Estatus=response.estatus;
    });
    this.familiaService.getAll().subscribe((data:Familia[])=>{
      this.familia=data;
    });
    this.solicitar={
      id:"",
      id_solicitud:this.idSolicitud,
      descripcion:"",
      familia:"",
      caracterone:"",
      caractertwo:"",
      estatus:"",
    }
  }
  submit(element:Material){
    this.materialService.create(this.solicitar).subscribe(res=>{
      console.log('Material Agregado');
      //const materialId = res.id; // Accede al ID bajo la clave 'material_id'
      //console.log('ID del material creado:', materialId);
      const materialCreado = {
        id:res.id,
        id_solicitud:this.idSolicitud,
        descripcion:element.descripcion,
        familia:element.familia,
        caracterone:element.caracterone,
        caractertwo:element.caractertwo,
        estatus:element.estatus,
      };
      this.material.push(materialCreado);
      //console.log(materialCreado);
      // Limpia los campos del objeto 'solicitar'
    this.solicitar = {
      id: "",
      id_solicitud: this.idSolicitud,
      descripcion: "",
      familia: "",
      caracterone: "",
      caractertwo: "",
      estatus:"",
    };
    });
  }
  get f(){
    return this.form.controls;
  }
  addNewClose(value:boolean){
    this.newClose.emit(value);
  }
  eliminar(idMaterial:string|number){
    this.materialService.delete(idMaterial).subscribe(res=>{
      this.material = this.material.filter(item => item.id !== idMaterial);
      console.log('Material Eliminado');
    })
    /*for(let i=0;i<this.material.length;i++){
      if(i==idMaterial) {
        this.material.splice(i,1);
      }
    }*/
  }


  EnviarSoli(value:boolean){

    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
      // Verifica si el arreglo this.material está vacío
      if (this.material.length === 0) {
        console.log('El arreglo this.material está vacío.');
        alert('Sin materiales, Agregar al menos uno');
        //this.contMaterial=true;
      } else {
        console.log('El arreglo this.material no está vacío y contiene elementos.');
        //this.contMaterial=false;
        this.solicitudService.update(this.idSolicitud, this.form.value).subscribe(res => {
          this.form.setValue(
            {
            'estatus':"Nueva",
          });
          console.log('Enviado');
          alert('Solicitud Enviada');
          this.newEnviar.emit(value);
        });
      }
    });
    /*if(this.contMaterial==true){
      alert('Sin materiales, Agregar al menos uno');
    }else{
      this.solicitudService.update(this.idSolicitud, this.form.value).subscribe(res => {
        this.form.setValue(
          {
          'estatus':"Nueva",
        });
        console.log('Enviado');
        alert('Solicitud Enviada');
        this.newEnviar.emit(value);
      });
    }*/
  }
  masMaterial(){
    this.addMaterial=!this.addMaterial;
  }
}
