import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';


@Component({
  selector: 'app-form-solicitud-c',
  templateUrl: './form-solicitud-c.component.html',
  styleUrls: ['./form-solicitud-c.component.css']
})
export class FormSolicitudCComponent implements OnInit{

  selectedValue: number = 0; // Valor seleccionado del select
  materialClasses: string[] = []; // Arreglo de clases a mostrar

  constructor(public solicitudService:SolicitudService,public router:Router){}

  ngOnInit(): void {

  }



  submit(){

  }

}
