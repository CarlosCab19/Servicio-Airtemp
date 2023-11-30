import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MaterialService } from 'src/app/services/material.service';
import { PersonalService } from 'src/app/services/personal.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Cotizacion } from 'src/app/shared/cotizacion';
import { Caractermaterial, Familia, Material } from 'src/app/shared/material';
import { Personal } from 'src/app/shared/personal';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit{
  solicitudes:Solicitud[]=[];
  solicitud!:Solicitud;
  materiales:Material[]=[];
  material!:Material;
  cotizaciones:Cotizacion[]=[];
  personal!:Personal;

  /*para traer y guardar la informacion de una solicitud*/
  idSolicitud:string='';
  tipo:string='';
  id_solicitante:string='';
  id_analista:string='-';
  id_director:string='';
  cliente:string='';
  estatus:string='';
  codigoProv:string='';
  numParte:string='';
  /*para editar el estatus*/
  form!:FormGroup;
  /*para traer y guardar los datos del material*/
  descripcion:string='';
  familiaId:string='';
  /*para abrir y cerrar el acordeon*/
  acordeonAbierto: string | null = null; // Variable para rastrear el acordeón abierto
  /*para el buscador*/
  filtroBusqueda: string = '';


  constructor(private solicitudesS:SolicitudService,private personalS:PersonalService,private materialS:MaterialService,
              private cotizacionS:CotizacionService){}

  ngOnInit(): void {
    this.solicitudesS.getAll().subscribe((data:Solicitud[])=>{
      this.solicitudes = data;
    });
    this.form = new FormGroup({
      estatus: new FormControl('', [ Validators.required, Validators.pattern('^(Nueva|Cotizado|Aprobado|Vencido)$') ]),
    });
  }
  filtrarSolicitudes(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();
    return this.solicitudes.filter((solicitud) => {
      // Puedes ajustar la lógica de filtrado según tus necesidades
      return solicitud.id.toString().toLowerCase().includes(valorBusqueda) ||
             solicitud.solicitante.toLowerCase().includes(valorBusqueda) ||
             solicitud.tipo.toLowerCase().includes(valorBusqueda) ||
             solicitud.NomCliente.toLowerCase().includes(valorBusqueda) ||
             solicitud.estatus.toLowerCase().includes(valorBusqueda);
    });
  }

  get f(){
    return this.form.controls;
  }
  verEditar(id:string){
    this.solicitudesS.find(id).subscribe((response=>{
      this.solicitud=response;
      this.idSolicitud=response.id;
      this.tipo=response.tipo;
      this.id_solicitante=response.solicitante;
      this.estatus=response.estatus;
      this.personalS.find(response.id_analista).subscribe((res=>{
        this.personal=res;
        if(res && res.nombres && res.apellidos){
          this.id_analista=res.nombres + '' +res.apellidos;
        }else{
          this.id_analista= '- - -';
        }
      }));
      this.personalS.find(response.id_director).subscribe((res => {
        this.personal = res;

        if (res && res.nombres && res.apellidos) {
          this.id_director = res.nombres + ' ' + res.apellidos;
        } else {
          this.id_director = '- - -';
        }
      }));

    }));
  }
  submit(id: string, nuevoEstatus: string) {
    // Encuentra la solicitud correspondiente
    const solicitud = this.solicitudes.find(solicitud => solicitud.id === id);

    // Verifica si se encontró la solicitud en la lista antes de actualizar
    if (solicitud) {
      // Actualiza el estatus de la solicitud localmente
      solicitud.estatus = nuevoEstatus;
      // Actualiza el estatus en el servidor
      this.solicitudesS.updateSoporte(id, { estatus: nuevoEstatus }).subscribe(
        (res: any) => {
          console.log('Estatus actualizado', res);
        },
        error => {
          console.error('Error al actualizar el estatus', error);
          // Si hay un error, revierte el cambio localmente para mantener sincronía con el servidor
          solicitud.estatus = solicitud.estatus;
        }
      );
    } else {
      console.error('No se encontró la solicitud en la lista para actualizar');
    }
  }

  // Función que se ejecuta cuando cambia la opción en el select
  onEstatusChanged(id: string) {
    // Obtén el nuevo estatus seleccionado
    const nuevoEstatus = this.form.value.estatus;
    // Llama a la función submit para realizar la actualización
    this.submit(id, nuevoEstatus);
  }

  verInformacion(id:string){
    /*para buscar la información de la solicitud*/
    this.solicitudesS.find(id).subscribe((response=>{
      this.solicitud=response;
      this.idSolicitud=response.id;
      this.tipo=response.tipo;
      this.id_solicitante=response.solicitante;
      this.cliente=response.NomCliente;
      this.codigoProv=response.codProv;
      this.numParte=response.NumParte;
      this.estatus=response.estatus;
      this.personalS.find(response.id_analista).subscribe((res=>{
        this.personal=res;
        if(res && res.nombres && res.apellidos){
          this.id_analista=res.nombres + '' +res.apellidos;
        }else{
          this.id_analista= '- - -';
        }
      }));
      this.personalS.find(response.id_director).subscribe((res => {
        this.personal = res;

        if (res && res.nombres && res.apellidos) {
          this.id_director = res.nombres + ' ' + res.apellidos;
        } else {
          this.id_director = '- - -';
        }
      }));

    }));
    /*para buscar la informacion del material*/
    this.materialS.getList(id).subscribe((data:Material[])=>{
      this.materiales=data;
      console.log('Materiales:',data)
    })
  }
  cotizacion(id:string){
    if (this.acordeonAbierto === id) {
      // Si el acordeón ya está abierto, ciérralo
      this.acordeonAbierto = null;
    } else {
      // Si el acordeón está cerrado, ábrelo
      this.acordeonAbierto = id;
    }
    console.log('id del material:',id);
    this.cotizacionS.getList(id).subscribe((data:Cotizacion[])=>{
      this.cotizaciones=data;
    })
  }
  //para el manejo del acordeon
  estaAbierto(id: string): boolean {
    return this.acordeonAbierto === id;
  }
   //Mapeo de las monedas
   monedaSimbolos: { [key: string]: string } = {
    pesos_mexicanos: 'Mex$ ',
    dolares_usa: 'US$ ',
    euro: '€ ',
  }


}
