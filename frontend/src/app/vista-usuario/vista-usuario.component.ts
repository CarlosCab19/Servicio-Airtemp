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

  nombrePersonal:string="ffgdg";
  id:string="";
  personalN:Personal | undefined;


  constructor(private router: Router,private rutaActiva: ActivatedRoute,
              private personalService:PersonalService){}

  ngOnInit(): void {
    /*this.id=this.rutaActiva.snapshot.paramMap.get('id');
    this.personService.find(this.id).subscribe(response=>{
      this.personalN=response;
      this.nombrePersonal=response.nombres;
    });*/

  }


  mostrarInformacion: boolean = false;

  toggleInfo() {
    this.mostrarInformacion = !this.mostrarInformacion;
  }
}
