import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from 'src/app/services/personal.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
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
  personal!:Personal;

  /*para traer la informacion de una solicitud*/
  idSolicitud:string='';
  tipo:string='';
  id_solicitante:string='';
  id_analista:string='-';
  id_director:string='';
  estatus:string='';
  /*para editar el estatus*/
  form!:FormGroup;

  constructor(private solicitudesS:SolicitudService,private personalS:PersonalService){}

  ngOnInit(): void {
    this.solicitudesS.getAll().subscribe((data:Solicitud[])=>{
      this.solicitudes = data;
    });
    this.form = new FormGroup({
      estatus: new FormControl('', [ Validators.required, Validators.pattern('^(Nueva|Cotizado|Aprobado|Vencido)$') ]),
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


}
