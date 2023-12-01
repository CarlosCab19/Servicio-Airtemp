import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaracterService } from 'src/app/services/caracter.service';
import { CaractermaterialService } from 'src/app/services/caractermaterial.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Caracteristica, Caractermaterial, Familia, Material } from 'src/app/shared/material';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-masinfo-soli',
  templateUrl: './masinfo-soli.component.html',
  styleUrls: ['./masinfo-soli.component.css'],
  providers: [DatePipe],
})
export class MasinfoSoliComponent implements OnInit{
  //Valores que se reciben y se mandan del componente principal
  @Input() idSolicitud:string="";
  @Input() responsable:string="";
  @Output() newClose = new EventEmitter<boolean>();
  @Output() newEnviar = new EventEmitter<boolean>();
  //Variables para la solicitud
  Rsocial:string="";
  codiProv:string="";
  nomClien:string="";
  numParte:string="";
  Estatus:string="";
  //variables,arreglos para guardar y hacer consultas de la informacion de cada solicitud
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

  //para el cambio del modal
  agregar:boolean=false;
  caracterForm:boolean=false;
  valorForm:boolean=false;
  verPrincipal:boolean=true;

  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,
    private materialService:MaterialService, private familiaService:FamiliaService,
    private caracteristicaService:CaracterService,private caracterMaterial:CaractermaterialService){}

  ngOnInit(): void {
    //para traer los meteriales de esa solictud
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
    });
    //se recuperan los datos de la solicitud
    this.solicitudService.find(this.idSolicitud).subscribe(response=>{
      this.solicitud=response;
      this.codiProv=response.codProv;
      this.Rsocial=response.Rsocial;
      this.nomClien=response.NomCliente;
      this.numParte=response.NumParte;
      this.Estatus=response.estatus;
    });
    //se obtienne las familias a los que puede pertenecer cada material
    this.familiaService.getAll().subscribe((data:Familia[])=>{
      this.familia=data;
    });
    //interfaz para solicitar el material
    this.solicitar={
      id:"",
      id_solicitud:this.idSolicitud,
      descripcion:"",
      familia:"",
      estatus:"",
    };
  }
  //Metodos para la interaccion de los componentes
  verCaracteristicas(valor:boolean,id:string){
    /*this.caracterForm = valor;
    this.agregar =!valor;*/
    this.idMaterial=id;
    this.caracterMaterial.getList(id).subscribe(data=>{
      this.caracterDelMaterial=data;
    })
  }
  verValor(valor:boolean){
    this.caracterForm=!valor;
    this.valorForm=valor;
    this.verPrincipal=!valor;
  }
  finalizar(estado:boolean){
    this.caracterForm=!estado;
    this.valorForm=!estado;
    this.verPrincipal=estado;
  }
  //se obtiene las caracteristicas de cada material
  obtenerCaracteristicas(event: any) {
    const familiaId = event.target.value; // Obtiene el valor seleccionado
    if (familiaId) {
      // Realiza una llamada al servicio o a la base de datos para obtener las características
      this.caracteristicaService.getList(familiaId)
        .subscribe(data => {
          this.caracteristicas = data;
        });
    } else {
      this.caracteristicas = []; // Limpia las características si no se selecciona una familia
    }
  }
//Metodo que agrega un material nuevo
  submit(element:Material){
    this.materialService.create(this.solicitar).subscribe(res=>{
      console.log('Material Agregado');
      //interfaz nueva donde se junta los datos del material creado
      const materialCreado = {
        id:res.id,
        id_solicitud:this.idSolicitud,
        descripcion:element.descripcion,
        familia:element.familia,
        estatus:element.estatus,
      };
      //console.log('Este es el id del material que cree: ',res.id);
      this.material.push(materialCreado);
      this.solicitar={
        id:"",
        id_solicitud:this.idSolicitud,
        descripcion:"",
        familia:"",
        estatus:"",
      };
      this.verCaracteristicas(true,res.id);
    });
  }
  //metodo para agregar caracteristicas a cada material
  seleccionarCaracteristica(items: any) {
    this.agregarCaracter={
      id:'',
      id_material:this.idMaterial,
      caracteristica:items.caracteristica,
      valor:'',
      estatus:'Nuevo',
    }
    //console.log('elemento selecionado: ',items.caracteristica);
    this.caracterMaterial.getList(this.idMaterial).subscribe(data=>{
      this.caracterDelMaterial=data;
      //console.log('caracteristicas que tiene el material: ',data);
      // Verificar si la característica ya existe en el arreglo
      const existe = this.caracterDelMaterial.some(caracter => caracter.caracteristica === items.caracteristica);
      if (!existe) {
        // Si no existe esa caracteristica, entonces la agregamos
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
        //console.log('La característica ya existe y no se agregará.');
        alert('La característica ya se encuentra agregada');
      }
    });
  }
  //metodo para ver las caracteristicas del material
  AbrirMaterial(id:string,idfam:string){
    this.caracterForm=true;
    this.verPrincipal=false;
    /*console.log('este es el id del material: ',id);
    console.log('este es el id de la familia: ',idfam);*/
    this.idMaterial=id;
    this.caracteristicaService.getList(idfam).subscribe(data=>{
      this.caracteristicas=data;
    });
    this.caracterMaterial.getList(id).subscribe(data=>{
      this.caracterDelMaterial=data;
    });
  }

  addNewClose(value:boolean){
    this.newClose.emit(value);
  }
  //metodo para eliminar los materiales agregados
  eliminar(idMaterial:string|number){
    this.caracterMaterial.delete(idMaterial).subscribe(res=>{
      this.caracterDelMaterial = this.caracterDelMaterial.filter(item => item.id !== idMaterial);
      console.log('Material Eliminado');
    })
  }
  inputValue: string = '';
  //Metodo para agregar los valores a cada caracteristica
  addValor(idvalor: string) {
    //console.log('le pondré valor a:', idvalor);
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

  //Metodo para enviar la solicitud con los materiales y sus caracteristicas agregadas
  EnviarSoli(value:boolean){
    this.materialService.getList(this.idSolicitud).subscribe((data: Material[])=>{
      this.material = data;
      // Verifica si el arreglo this.material está vacío para decidir si se envia o no
      if (this.material.length === 0) {
        //console.log('El arreglo this.material está vacío.');
        alert('Sin materiales, agregar al menos uno');
      } else {
        //console.log('El arreglo this.material no está vacío y contiene elementos.');
        this.solicitudService.update(this.idSolicitud,{estatus:'Nueva'}).subscribe(res => {
          //console.log('Enviado');
          alert('Solicitud Enviada');
          this.newEnviar.emit(value);
        });
      }
    });
  }
  //para cerrar cada componente o formulario
  cerrar(valor:boolean){
    this.newEnviar.emit(valor);
  }
  cerrar2(valor:boolean){
    this.agregar=!valor;
    this.verPrincipal=valor;
  }

}
