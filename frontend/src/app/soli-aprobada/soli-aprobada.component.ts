import { Component, OnInit } from '@angular/core';
import { FamiliaService } from '../services/familia.service';
import { Caracteristica, Familia } from '../shared/material';
import { CaractermaterialService } from '../services/caractermaterial.service';
import { CaracterService } from '../services/caracter.service';

@Component({
  selector: 'app-soli-aprobada',
  templateUrl: './soli-aprobada.component.html',
  styleUrls: ['./soli-aprobada.component.css']
})
export class SoliAprobadaComponent implements OnInit{

  familia:Familia[]=[];
  familiaN!:Familia;
  caracteristicas:Caracteristica[]=[];
  caracterN!:Caracteristica;

  constructor(private familiaService:FamiliaService, private caracterService:CaracterService){}

  ngOnInit(): void {
    this.familiaService.getAll().subscribe((data:Familia[])=>{
      this.familia=data;
    });
  }
  obtenerCaracteristicas(event: any) {
    const familiaId = event.target.value; // Obtiene el valor seleccionado
    if (familiaId) {
      // Realiza una llamada a tu servicio o base de datos para obtener las características
      this.caracterService.getList(familiaId)
        .subscribe(data => {
          this.caracteristicas = data;
        });
    } else {
      this.caracteristicas = []; // Limpia las características si no se selecciona una familia
    }
  }


}
