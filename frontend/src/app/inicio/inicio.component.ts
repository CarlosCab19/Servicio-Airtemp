import { Component, OnInit } from '@angular/core';
import { Personal } from '../shared/personal';
import { PersonalService } from '../services/personal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  usuario: string = "";
  contra: string = "";
  personals: Personal[] = [];
  id: number | undefined;
  admin: Personal | undefined;
  error: boolean = false;

  constructor(private readonly personService: PersonalService, private router: Router) {}

  ngOnInit(): void {
    this.personService.filtrado().subscribe(response => {
      this.personals = response; // No necesitas crear una copia del array
    });
  }

  onSubmit(form: any) {
    this.error = true; // Establece error como verdadero por defecto

    for (const element of this.personals) {
      if (element.usuario === this.usuario && element.contra === this.contra) {
        this.id = element.id;
        this.admin = element;
        this.error = false; // Resetea el error si las credenciales coinciden

         // Determina a qué departamento pertenece el usuario
        const departamento = element.departamento.toLowerCase();
        this.router.navigate([departamento,this.id]);
        //this.router.navigate(['/vista/', departamento, this.id]);
        break; // Sal del bucle si las credenciales coinciden
      }
    }
  }




}
