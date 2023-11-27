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
  fechaVencimiento: string = '';

  archivoParaSubir: File | null = null;
  archivoParaEditar: File | null = null;
  nombreArchivo:string='';
  idCotizacion:string='';
  tipoMoneda: string=""; // Variable para almacenar el símbolo de la moneda seleccionada.


  constructor(private cotizacionService:CotizacionService,private materialService:MaterialService,
              private familiaService:FamiliaService, private caracterMaterial:CaractermaterialService,
              private comprobanteServi:ComprobanteService,private comprobanteService:ComprobanteService){}

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
      estatus:'',
    };
  }
  submit(element:Cotizacion){
    this.cotizacionService.getList(this.idMaterial).subscribe((data:Cotizacion[])=>{
      this.cotizacion=data;
      /*console.log('tamaño',this.cotizacion.length);*/
      if(this.cotizacion.length <=19){
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
          this.idCotizacion=res.id;
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
        console.log('ya tiene las 20 cotizaciones');
        alert('Solo se permite agregar 20 cotizaciones');
      }
    });
  }
  eliminar(idCotizacion:string){
    this.cotizacionService.delete(idCotizacion).subscribe(res=>{
      this.cotizacion = this.cotizacion.filter(item => item.id !== idCotizacion);
      console.log('Cotización Eliminada');
    });
    this.comprobanteServi.eliminarArchivo(idCotizacion).subscribe(res=>{
      console.log('documento eliminado')
    })
  }
  closeCotizacion(valor:boolean){
    this.formCotizacion.emit(valor);
    /*this.valorArreglo.emit(this.cotizacion.length);
    console.log(this.cotizacion.length);*/
  }
  cotizacionLista(){
    this.newEstado.emit(true);
    if(this.cotizacion.length != 0){
      this.materialService.update(this.folio,{estatus:'Listo'}).subscribe(res=>{
        console.log('estatus de le cotizacion: Listo')
      });
      this.valorArreglo.emit('Listo');
    }else{
      this.materialService.update(this.folio,{estatus:'noListo'}).subscribe(res=>{
        console.log('estatus de le cotizacion: No listo');
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
      console.log(this.archivoParaSubir);
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }
  manejarArchivoInput2(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.archivoParaEditar = event.target.files[0];
      console.log(this.archivoParaEditar);
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }
  subirCompro(idCotizacion:string){
    this.idCotizacion=idCotizacion;
  }
  editarArchivo(){
    if (this.archivoParaEditar && this.idCotizacion) {
      console.log(this.idCotizacion);
      this.comprobanteServi.editarArchivo(this.archivoParaEditar, this.idCotizacion).subscribe(
        res => {
          console.log('Archivo editado con éxito', res);
          // Resto del código...
        },
        error => {
          console.error('Error al editar el archivo', error);
        }
      );
    } else {
      console.error('No se seleccionó ningún archivo para editar o falta el idCotizacion.');
    }
  }

  subirArchivo() {
    if (this.archivoParaSubir && this.idCotizacion) {
      this.comprobanteServi.subirArchivo(this.archivoParaSubir, this.idCotizacion).subscribe(res => {
        console.log('archivo subido');
        console.log('esto trae res: ', res);
        //this.documentos.push(res);
        this.nombreArchivo = res.nombre;
        // Restablecer el valor del input de tipo archivo
        const inputArchivo = document.getElementById('inputArchivo') as HTMLInputElement;
        if (inputArchivo) {
          inputArchivo.value = ''; // Esto restablecerá el valor del input a vacío
        }

        this.archivoParaSubir = null; // También es una buena práctica restablecer la variable
        this.idCotizacion = ''; // Restablecer el id_cotizacion después de subir el archivo
      });
    } else {
      console.log('No se seleccionó ningún archivo para subir o falta el idCotizacion.');
    }
  }
  eliminarArchivo(id:string){
    this.comprobanteServi.eliminarArchivo(id).subscribe(res=>{
      console.log('documento eliminado')
    })
  }
  verCompro(id:string){
    console.log('este es el id: ',id);
    this.comprobanteService.obtenerPDF(id).subscribe((data: Blob) => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank'); // Esto abrirá el PDF en una nueva pestaña
    });
  }

  /*comprobarArchivo() {
    if (this.archivoParaSubir && this.idCotizacion) {
      // Primero, verifica si existe un PDF con el ID proporcionado
      this.comprobanteServi.obtenerPDF(this.idCotizacion).subscribe(
        existePDF => {
          if (existePDF) {
            // Si existe un PDF, haz algo
            console.log('Ya existe un PDF con este ID. Realizando acción...');
            // Aquí puedes realizar la acción que desees cuando ya existe un PDF
            this.eliminarArchivo(this.idCotizacion);
            this.subirArchivo();
          }
        },
        error => {
          // Manejar el error HTTP aquí
          if (error.status === 404) {
            // Puedes mostrar un mensaje al usuario o realizar alguna acción específica para manejar el error 404
            console.error('El recurso no se encuentra. Puedes mostrar un mensaje o realizar alguna acción específica.');
            this.subirArchivo();
          } else {
            // Otros códigos de error HTTP
            console.error('Error al obtener el PDF:', error);
          }
        }
      );
    } else {
      console.log('No se seleccionó ningún archivo para subir o falta el idCotizacion.');
    }
  }*/
}
