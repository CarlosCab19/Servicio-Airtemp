import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MaterialService } from 'src/app/services/material.service';
import { Cotizacion } from 'src/app/shared/cotizacion';
import { Material } from 'src/app/shared/material';

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

  @Output() formCotizacion = new EventEmitter<boolean>();
  @Input() idMaterial:string="";
  @Input() idAnalista:string="";
  @Output() newEstado = new EventEmitter<boolean>();
  @Output() valorArreglo=new EventEmitter<string>();

  //variables para los datos del material
  folio:string="";
  descripcion:string="";
  familia:string="";
  caracter1:string="";
  caracter2:string="";
  material!:Material;

  tipoMoneda: string=""; // Variable para almacenar el símbolo de la moneda seleccionada.

  form = new FormGroup({
    estatus:  new FormControl('Listo', [ Validators.required]),
  });
  form2 = new FormGroup({
    estatus:  new FormControl('noListo', [ Validators.required]),
  });

  constructor(private cotizacionService:CotizacionService,private materialService:MaterialService){}

  onTipoMonedaSelected() {
    // Puedes acceder a this.tipoMoneda para obtener el símbolo de la moneda seleccionada.
    console.log('Símbolo de moneda seleccionada:', this.tipoMoneda);
  }

  ngOnInit(): void {
    this.materialService.find(this.idMaterial).subscribe(response=>{
      this.material=response;
      this.folio=response.id;
      this.descripcion=response.descripcion;
      this.familia=response.familia;
      this.caracter1=response.caracterone;
      this.caracter2=response.caractertwo;
    });
    this.cotizacionService.getList(this.idMaterial).subscribe((data:Cotizacion[])=>{
      this.cotizacion=data;
      /*console.log('tamaño',this.cotizacion.length);
      console.log('cotizacion tiene: ',this.cotizacion)*/
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
      estatus:'',
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

  /*monedaNombres: { [key: string]: string } = {
    pesos_mexicanos: 'Peso mexicano',
    dolares_usa: 'Dólar estadounidense',
    euro:'Euro',
  };*/

}
