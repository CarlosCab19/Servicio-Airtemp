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
  idMaterial:string="";
  caracterDelMaterial:Caractermaterial[]=[];
  agregarCaracter!:Caractermaterial;


  //para el selec de familia
  selectedFamilia:string="";
  //datos para el modal
  familiaM:string="";

  form = new FormGroup({
    estatus:  new FormControl('Nueva', [ Validators.required]),
  });
  /*formValor = new FormGroup({
    estatus: new FormControl('Valor',[Validators.required]),
    valor: new FormControl('',[Validators.required]),
  });*/

  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,
    private materialService:MaterialService, private familiaService:FamiliaService,
    private caracteristicaService:CaracterService,private caracterMaterial:CaractermaterialService){}

  ngOnInit(): void {
    //para traer los meteriales de esa solictud
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
    });
    this.materialService.getList(this.idSolicitud)
        .subscribe(caracteristicas => {
          this.material = caracteristicas;
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
    };
  }
  obtenerCaracteristicas(event: any) {
    const familiaId = event.target.value; // Obtiene el valor seleccionado
    if (familiaId) {
      // Realiza una llamada a tu servicio o base de datos para obtener las características
      this.caracteristicaService.getList(familiaId)
        .subscribe(data => {
          this.caracteristicas = data;
        });
    } else {
      this.caracteristicas = []; // Limpia las características si no se selecciona una familia
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
      this.idMaterial=res.id;
      console.log('Este es el id del material que cree: ',this.idMaterial)
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
  seleccionarCaracteristica(items: any) {
    this.agregarCaracter={
      id:'',
      id_material:this.idMaterial,
      caracteristica:items.caracteristica,
      valor:'',
      estatus:'Nuevo',
    }
    console.log('elemento selecionado: ',items.caracteristica);
    this.caracterMaterial.getList(this.idMaterial).subscribe(data=>{
      this.caracterDelMaterial=data;
      console.log('caracteristicas que tiene el material: ',data);

      // Verificar si la característica ya existe en el arreglo
      const existe = this.caracterDelMaterial.some(caracter => caracter.caracteristica === items.caracteristica);

      if (!existe) {
        // Si no existe, entonces la agregamos
        this.caracterMaterial.create(this.agregarCaracter).subscribe(res=>{
          console.log('caracteristica agregada');
          const caracterAgregado ={
            id:res.id,
            caracteristica:items.caracteristica,
          }
          console.log(res.caracteristica);
          this.caracterDelMaterial.push(caracterAgregado);
        });
      } else {
        // Si ya existe, mostramos un mensaje
        console.log('La característica ya existe y no se agregará.');
        alert('La característica ya existe y no se agregará.')
      }
    });
  }
  //metodo para ver las caracteristicas del material
  AbrirMaterial(id:string){
    console.log('este es el iddddd: ',id);
    this.idMaterial=id;
    this.materialService.find(id).subscribe(response=>{
      this.solicitar=response;
      console.log('id familia: ',response.familia);
      this.caracteristicaService.getList(response.familia).subscribe(data=>{
        this.caracteristicas=data;
      });
      this.caracterMaterial.getList(id).subscribe(data=>{
        this.caracterDelMaterial=data;
      })
    });
  }

  addNewClose(value:boolean){
    this.newClose.emit(value);
  }
  eliminar(idMaterial:string|number){
    this.caracterMaterial.delete(idMaterial).subscribe(res=>{
      this.caracterDelMaterial = this.caracterDelMaterial.filter(item => item.id !== idMaterial);
      console.log('Material Eliminado');
    })
  }
  inputValue: string = '';
  addValor(idvalor: string) {
    console.log('le pondré valor a:', idvalor);
    // Encuentra el elemento en caracterDelMaterial con el ID correspondiente
    const itemToUpdate = this.caracterDelMaterial.find(item => item.id === idvalor);
    if (itemToUpdate) {
      // Actualiza el valor del elemento encontrado
      itemToUpdate.valor = this.inputValue;
    }
    this.agregarCaracter = {
      id: '',
      valor: this.inputValue,
      estatus: 'valor',
    };
    this.caracterMaterial.update(idvalor, this.agregarCaracter).subscribe(res => {
      console.log('valor agregado');
      this.inputValue = '';
    });
  }
  //para validar que todas las caracteristicas tienen valor
  todosLosCamposLlenos(caracterDelMaterial: any[]): boolean {
    for (const item of caracterDelMaterial) {
      if (!item.caracteristica || !item.valor) {
        return false; // Si encuentra una fila con campos vacíos, devuelve falso
      }
    }
    return true; // Si todas las filas tienen campos llenos, devuelve verdadero
  }


  EnviarSoli(value:boolean){
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
      // Verifica si el arreglo this.material está vacío
      if (this.material.length === 0) {
        console.log('El arreglo this.material está vacío.');
        alert('Sin materiales, Agregar al menos uno');
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
      }
    });
  }
  masMaterial(){
    this.addMaterial=!this.addMaterial;
  }

}
