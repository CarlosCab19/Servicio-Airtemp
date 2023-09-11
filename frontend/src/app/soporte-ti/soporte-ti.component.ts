import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from '../shared/personal';
import { PersonalService } from '../services/personal.service';

@Component({
  selector: 'app-soporte-ti',
  templateUrl: './soporte-ti.component.html',
  styleUrls: ['./soporte-ti.component.css'],
  providers: [DatePipe], // Añade DatePipe a los providers
})
export class SoporteTIComponent implements OnInit{

  personals:Personal[]=[];



  constructor(private personalService:PersonalService,
     private http:HttpClient,
     private router:Router,
     public datePipe: DatePipe){}

  ngOnInit(): void {
    this.personalService.getAll().subscribe((data: Personal[])=>{
      this.personals = data;
      console.log(this.personals);
    })
  }

  deletePerson(id: number){
    this.personalService.delete(id).subscribe(res => {
         this.personals = this.personals.filter(item => item.id !== id);
         console.log('Personal deleted successfully!');
    })
  }

  // Función para formatear la fecha
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }

}
