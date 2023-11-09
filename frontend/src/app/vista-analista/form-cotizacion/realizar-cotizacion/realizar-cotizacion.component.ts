import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaractermaterialService } from 'src/app/services/caractermaterial.service';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { MaterialService } from 'src/app/services/material.service';
import { Cotizacion } from 'src/app/shared/cotizacion';
import { Caractermaterial, Material } from 'src/app/shared/material';
import { Familia } from 'src/app/shared/material';

@Component({
  selector: 'app-realizar-cotizacion',
  templateUrl: './realizar-cotizacion.component.html',
  styleUrls: ['./realizar-cotizacion.component.css']
})
export class RealizarCotizacionComponent implements OnInit{

  //datos a recibir de form-cotizacion
  activarForm:boolean=false;

  cotizar!:Cotizacion;
  cotizacion:Cotizacion[]=[];
  caractermaterial:Caractermaterial[]=[];

  @Output() formCotizacion = new EventEmitter<boolean>();
  @Input() idMaterial:string="";
  @Input() idAnalista:string="";
  @Output() newEstado = new EventEmitter<boolean>();
  @Output() valorArreglo=new EventEmitter<string>();

  //variables para los datos del material
  folio:string='';
  descripcion:string='';
  familia:string='';
  material!:Material;
  familiaN!:Familia;

  archivoParaSubir: File | null = null;
  nombreArchivo:string='';
  idCotizacion:string='';
  tipoMoneda: string=""; // Variable para almacenar el símbolo de la moneda seleccionada.

  form = new FormGroup({
    estatus:  new FormControl('Listo', [ Validators.required]),
  });
  form2 = new FormGroup({
    estatus:  new FormControl('noListo', [ Validators.required]),
  });

  constructor(private cotizacionService:CotizacionService,private materialService:MaterialService,
              private familiaService:FamiliaService, private caracterMaterial:CaractermaterialService,
              private comprobanteServi:ComprobanteService){}

  onTipoMonedaSelected() {
    // Puedes acceder a this.tipoMoneda para obtener el símbolo de la moneda seleccionada.
    console.log('Símbolo de moneda seleccionada:', this.tipoMoneda);
  }

  ngOnInit(): void {
    this.materialService.find(this.idMaterial).subscribe(response=>{
      this.material=response;
      this.folio=response.id;
      this.descripcion=response.descripcion;
      this.familiaService.find(response.familia).subscribe(response=>{
        this.familiaN=response;
        this.familia=response.familia;
      });
      this.caracterMaterial.getList(response.id).subscribe((data:Caractermaterial[])=>{
        this.caractermaterial=data;
      })
    });
    this.cotizacionService.getList(this.idMaterial).subscribe((data:Cotizacion[])=>{
      this.cotizacion=data;
    });
    this.cotizar={
      id:'',
      id_material:this.idMaterial,
      id_analista:this.idAnalista,
      id_director:'',
      moneda:'',
      fabricacion:'',
      lme:'',
      premium:'',
      total:'',
      icoterm:'',
      estatus:'Agregado',
    };
  }
  submit(element:Cotizacion){
    this.cotizacionService.getList(this.idMaterial).subscribe((data:Cotizacion[])=>{
      this.cotizacion=data;
      /*console.log('tamaño',this.cotizacion.length);*/
      if(this.cotizacion.length <=2){
        /*console.log('el tamaño del arreglo tiene 3 o menos de 3 asi que agrega');*/
        this.cotizacionService.create(this.cotizar).subscribe(res=>{
          console.log('cotizacion agregada');
          const cotizacionAdd={
            id:res.id,
            id_material:this.idMaterial,
            id_analista:this.idAnalista,
            id_director:element.id_director,
            moneda:element.moneda,
            fabricacion:element.fabricacion,
            lme:element.lme,
            premium:element.premium,
            total:element.total,
            icoterm:element.icoterm,
            estatus:element.estatus,
          }
          this.cotizacion.push(cotizacionAdd);
          this.cotizar={
            id:'',
            id_material:this.idMaterial,
            id_analista:this.idAnalista,
            id_director:'',
            moneda:'',
            fabricacion:'',
            lme:'',
            premium:'',
            total:'',
            icoterm:'',
            estatus:'',
          };
        });
      }else{
        console.log('ya tiene las 3 cotizaciones');
        alert('Solo se permite agregar 3 cotizaciones');
      }
    });
  }
  eliminar(idCotizacion:string){
    this.cotizacionService.delete(idCotizacion).subscribe(res=>{
      this.cotizacion = this.cotizacion.filter(item => item.id !== idCotizacion);
      console.log('Cotización Eliminada');
    })
  }
  closeCotizacion(valor:boolean){
    this.formCotizacion.emit(valor);
    /*this.valorArreglo.emit(this.cotizacion.length);
    console.log(this.cotizacion.length);*/
  }
  get f(){
    return this.form.controls;
  }
  get f2(){
    return this.form2.controls;
  }
  cotizacionLista(){
    this.newEstado.emit(true);
    if(this.cotizacion.length != 0){
      this.materialService.update(this.folio,this.form.value).subscribe(res=>{
        console.log(this.form.value);
        this.form.setValue(
          {
          'estatus':"",
        });
      });
      this.valorArreglo.emit('Listo');
    }else{
      this.materialService.update(this.folio,this.form2.value).subscribe(res=>{
        console.log(this.form2.value);
        this.form.setValue(
          {
          'estatus':"",
        });
      });
      this.valorArreglo.emit('noListo');
    }
  }
  //Mapeo de las monedas
  monedaSimbolos: { [key: string]: string } = {
    pesos_mexicanos: 'Mex$ ',
    dolares_usa: 'US$ ',
    euro: '€ ',
  };

  manejarArchivoInput(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.archivoParaSubir = event.target.files[0];
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }
  subirCompro(idCotizacion:string){
    this.idCotizacion=idCotizacion;
  }
  /*subirArchivo() {
    if (this.archivoParaSubir && this.idCotizacion) { // Asegúrate de tener el id_cotizacion
      this.comprobanteServi.subirArchivo(this.archivoParaSubir, this.idCotizacion).subscribe(res => {
        console.log('Archivo subido');
        console.log('Esto trae res: ', res);
        this.nombreArchivo = res.archivo;

        // Restablecer el valor del input de tipo archivo
        const inputArchivo = document.getElementById('inputArchivo') as HTMLInputElement;
        if (inputArchivo) {
          inputArchivo.value = ''; // Esto restablecerá el valor del input a vacío
        }

        this.archivoParaSubir = null; // También es una buena práctica restablecer la variable
      });
    } else {
      console.log('No se seleccionó ningún archivo para subir o no se proporcionó id_cotizacion.');
    }
  }*/

  subirArchivo() {
    if (this.archivoParaSubir) {
      this.comprobanteServi.subirArchivo(this.archivoParaSubir).subscribe(res => {
        console.log('archivo subido');
        console.log('esto trae res: ',res);
        //this.documentos.push(res);
        this.nombreArchivo=res.archivo;
        // Restablecer el valor del input de tipo archivo
        const inputArchivo = document.getElementById('inputArchivo') as HTMLInputElement;
        if (inputArchivo) {
          inputArchivo.value = ''; // Esto restablecerá el valor del input a vacío
        }

        this.archivoParaSubir = null; // También es una buena práctica restablecer la variable
      });
    } else {
      console.log('No se seleccionó ningún archivo para subir.');
    }
  }

  /*monedaNombres: { [key: string]: string } = {
    pesos_mexicanos: 'Peso mexicano',
    dolares_usa: 'Dólar estadounidense',
    euro:'Euro',
  };*/

}
