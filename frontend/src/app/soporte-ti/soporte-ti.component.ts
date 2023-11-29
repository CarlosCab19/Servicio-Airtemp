import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personal } from '../shared/personal';
import { PersonalService } from '../services/personal.service';

@Component({
  selector: 'app-soporte-ti',
  templateUrl: './soporte-ti.component.html',
  styleUrls: ['./soporte-ti.component.css'],
})
export class SoporteTIComponent implements OnInit{
  nomSoporte:string='';
  id:string='1';
  personalN!:Personal;
  idSoporte:string='';
  personals:Personal[]=[];


  constructor(private personalService:PersonalService,private rutaActiva: ActivatedRoute){}

  ngOnInit(): void {
    this.personalService.getAll().subscribe((data: Personal[])=>{
      this.personals = data;
      /*console.log(this.personals);*/
    });
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      this.personalN=response;
      this.idSoporte=response.id;
      this.nomSoporte=response.nombres + " " + response.apellidos;
    });
    this.rutaActiva.url.subscribe(url => {
      console.log('Ruta activa:', url);
      // Realizar acciones específicas basadas en la ruta activa
    });
  }
  deletePerson(id: string){
    this.personalService.delete(id).subscribe(res => {
         this.personals = this.personals.filter(item => item.id !== id);
         console.log('Personal deleted successfully!');
    })
  }

}
