import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../shared/personal';
import { Solicitud } from '../shared/solicitud';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit{

  fechaActual: string;
  selectedFile: File | null = null;
  nombrePersonal:string="";
  apellidoPersonal:string="";
  id:string="";
  personalN:Personal | undefined;

  /*para mostrar las vistas*/
  solicitudes:boolean=true;
  formulario:boolean=false;
  cotizadas:boolean=false;




  constructor(private router: Router,private rutaActiva: ActivatedRoute,
      private personalService:PersonalService, private solicitudService:SolicitudService){
      // Obtener la fecha actual y formatearla como "YYYY-MM-DD"
      const today = new Date();
     const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.fechaActual = `${year}-${month}-${day}`;}

  ngOnInit(): void {
    /*para trer un personal por su id y buscar sus nombres y apellidos*/
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      //console.log(response); // Agrega esta línea para depurar
      this.personalN=response;
      this.nombrePersonal=response.nombres;
      this.apellidoPersonal=response.apellidos;
    });
  }

  verSoli(){
    this.solicitudes=true;
    this.formulario=false;
    this.cotizadas=false;
  }
  verForm(){
    this.solicitudes=false;
    this.formulario=true;
    this.cotizadas=false;
  }
  verCotizadas(){
    this.solicitudes=false;
    this.formulario=false;
    this.cotizadas=true;
  }
  salir(){

  }

}
