import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../shared/personal';

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
  mostrarInformacion: boolean = false;
  mostrarSolicitudes:boolean = false;
  mostrarForm:boolean = true;


  constructor(private router: Router,private rutaActiva: ActivatedRoute,
      private personalService:PersonalService){
      // Obtener la fecha actual y formatearla como "YYYY-MM-DD"
      const today = new Date();
     const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.fechaActual = `${year}-${month}-${day}`;}

  onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
  }

  ngOnInit(): void {
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      //console.log(response); // Agrega esta línea para depurar
      this.personalN=response;
      this.nombrePersonal=response.nombres;
      this.apellidoPersonal=response.apellidos;
    });
  }

  toggleInfo() {
    this.mostrarInformacion = !this.mostrarInformacion;
  }
  toggleSoli(){
    this.mostrarSolicitudes;
  }
  toggleForm(){
    this.mostrarSolicitudes = !this.mostrarSolicitudes;
    this.mostrarForm = !this.mostrarForm;
  }
}
