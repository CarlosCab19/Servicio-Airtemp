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

  fechaActual: string;
  selectedFile: File | null = null;

  constructor(private router: Router, public personalService: PersonalService) {
    // Obtener la fecha actual y formatearla como "YYYY-MM-DD"
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.fechaActual = `${year}-${month}-${day}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  onSubmit() {
    if (this.selectedFile) {
      // Aquí puedes enviar el archivo al servidor o realizar otras acciones con él.
      // Por ejemplo, puedes usar una biblioteca como 'FormData' para enviarlo a un servidor.
    } else {
      alert('Por favor, seleccione un archivo PDF antes de enviarlo.');
    }
  }


}
