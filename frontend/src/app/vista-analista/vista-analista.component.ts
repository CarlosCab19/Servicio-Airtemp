import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../shared/personal';

@Component({
  selector: 'app-vista-analista',
  templateUrl: './vista-analista.component.html',
  styleUrls: ['./vista-analista.component.css']
})
export class VistaAnalistaComponent implements OnChanges,OnInit{
  verCotizadas:boolean=false;
  verAutorizadas:boolean=false;
  verRechazadas:boolean=false;
  verVencidas:boolean=false;
  verporCotizar:boolean=true;
  id:string="";
  analista!:Personal;
  idAnalista:string="";
  nomAnalista:string="";
  apeAnalista:string="";
  constructor(private router: Router,private rutaActiva: ActivatedRoute,private personalService:PersonalService){}

  ngOnChanges(): void {
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      //console.log(response); // Agrega esta línea para depurar
      this.analista=response;
      this.idAnalista=response.id;
      this.nomAnalista=response.nombres;
      this.apeAnalista=response.apellidos;
    });
  }
  ngOnInit(): void {
      this.ngOnChanges();
  }

  cotizadas(){
    this.verCotizadas=true;
    this.verAutorizadas=false;
    this.verRechazadas=false;
    this.verVencidas=false;

  }
  autorizadas(){
    this.verCotizadas=false;
    this.verAutorizadas=true;
    this.verRechazadas=false;
    this.verVencidas=false;

  }
  rechazadas(){
    this.verCotizadas=false;
    this.verAutorizadas=false;
    this.verRechazadas=true;
    this.verVencidas=false;

  }
  vencidas(){
    this.verCotizadas=true;
    this.verAutorizadas=false;
    this.verRechazadas=false;
    this.verVencidas=true;

  }

  salir(){
    this.router.navigateByUrl('/inicio');
  }

}
