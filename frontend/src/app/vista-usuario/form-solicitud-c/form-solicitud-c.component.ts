import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/shared/personal';

@Component({
  selector: 'app-form-solicitud-c',
  templateUrl: './form-solicitud-c.component.html',
  styleUrls: ['./form-solicitud-c.component.css']
})
export class FormSolicitudCComponent {
  id!:number;
  personal!:Personal;
  fechaActual: string;

  constructor(private router: Router, public personalService: PersonalService) {
    // Obtener la fecha actual y formatearla como "YYYY-MM-DD"
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.fechaActual = `${year}-${month}-${day}`;
  }


}
