import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaracterService } from 'src/app/services/caracter.service';
import { CaractermaterialService } from 'src/app/services/caractermaterial.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Caracteristica, Caractermaterial, Familia, Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

import Swal from 'sweetalert2'

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
  @Output() newEnviar = new EventEmitter<boolean>();

  Rsocial:string="";
  codiProv:string="";
  nomClien:string="";
  numParte:string="";
  Estatus:string="";

  familia:Familia[]=[];
  familiaN!:Familia;
  familiaNombre:string="";
  caracteristicas:Caracteristica[]=[];
  material:Material[]=[];
  solicitar!:Material;
  solicitud!:Solicitud;
  addMaterial:boolean=false;
  contMaterial!:boolean;
  idNuevo:string="";


  //para el selec de familia
  selectedFamilia:string="";
  //datos para el modal
  familiaM:string="";

  form = new FormGroup({
    estatus:  new FormControl('Nueva', [ Validators.required]),
  });


  fecha:Date|string="";
  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,
    private materialService:MaterialService, private familiaService:FamiliaService,
    private caracteristicaService:CaracterService){}

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
  }
  addCaracter(idFamilia:string){
    //this.idNuevo=idFamilia;
    this.caracteristicaService.getList(idFamilia).subscribe((data:Caracteristica[])=>{
      this.caracteristicas=data;
    });
    this.familiaService.find(idFamilia).subscribe(response=>{
      this.familiaN=response;
      this.familiaM=response.familia;
    })

  }


  EnviarSoli(value:boolean){

    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
      // Verifica si el arreglo this.material está vacío
      if (this.material.length === 0) {
        console.log('El arreglo this.material está vacío.');
        alert('Sin materiales, Agregar al menos uno');
        /*Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Sin materiales!, agregar al menos uno',
          footer: ''
        })*/
        //this.contMaterial=true;
      } else {
        console.log('El arreglo this.material no está vacío y contiene elementos.');
        this.solicitudService.update(this.idSolicitud, this.form.value).subscribe(res => {
          this.form.setValue(
            {
            'estatus':"Nueva",
          });
          console.log('Enviado');
          alert('Solicitud Enviada');
          this.newEnviar.emit(value);
        });
        /*Swal.fire({
          title: 'Enviar Solicitud?',
          text: "No podrás revertir esto",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, enviar'
        }).then((result) => {
          if (result.isConfirmed) {
            //this.contMaterial=false;
        this.solicitudService.update(this.idSolicitud, this.form.value).subscribe(res => {
          this.form.setValue(
            {
            'estatus':"Nueva",
          });
          console.log('Enviado');
          //alert('Solicitud Enviada');
          Swal.fire(
            'Enviado!',
            'Tu solicitud se envio correctamente.',
            'success'
          )
          this.newEnviar.emit(value);
        });
          }
        })*/
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
  onFamiliaSelected(event: any) {
    const selectedFamiliaId = event.target.value;
    // Resto del código para realizar la solicitud al backend y actualizar las características.
    if(selectedFamiliaId){
      this.caracteristicaService.getList(selectedFamiliaId).subscribe((data:Caracteristica[])=>{
        this.caracteristicas = data;
      })
    }
  }

}
