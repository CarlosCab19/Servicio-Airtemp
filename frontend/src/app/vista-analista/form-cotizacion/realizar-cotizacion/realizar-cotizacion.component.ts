import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() valorArreglo=new EventEmitter<number>();

  //variables para los datos del material
  folio:string="";
  descripcion:string="";
  familia:string="";
  caracter1:string="";
  caracter2:string="";
  material!:Material;

  constructor(private cotizacionService:CotizacionService,private materialService:MaterialService){}

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
            id_director:'',
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
    /*this.formCotizacion.emit(valor);
    this.valorArreglo.emit(this.cotizacion.length);
    console.log(this.cotizacion.length);*/
  }
  cotizacionLista(){
    this.newEstado.emit(true);
    this.valorArreglo.emit(this.cotizacion.length);
  }

}
