import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { PersonalService } from 'src/app/services/personal.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Material } from 'src/app/shared/material';
import { Personal } from 'src/app/shared/personal';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-masinfo-soli',
  templateUrl: './masinfo-soli.component.html',
  styleUrls: ['./masinfo-soli.component.css'],
  providers: [DatePipe],
})
export class MasinfoSoliComponent implements OnInit{
  solicitud!:Solicitud;
  solicitudN!:Solicitud;
  form = new FormGroup({
    estatus:  new FormControl('', [ Validators.required, Validators.pattern('^(Nueva)$') ]),
  });

  material:Material[]=[];
  infoMaterial:boolean=false;

  @Input() solicitudesId:null | string="";
  @Input() usuarioNom:string="";
  @Input() usuarioApe:string="";
  idN:null|string="";
  estatusS:string="";
  idUserS:string="";
  idProvS:string="";
  idClienS:string="";
  actualizar:string="";


  fecha:Date|string="";
  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,
    private materialService:MaterialService,private datePipe: DatePipe){

  }

  ngOnInit(): void {
    this.idN = this.solicitudesId;
    this.solicitudService.find(this.idN).subscribe(response=>{
      this.solicitud = response;
      this.estatusS=response.estatus;
      this.idUserS=response.id_usuario;
      this.idProvS=response.id_proveedor;
      this.idClienS=response.id_cliente;
      this.fecha=response.created_at;
    });
    this.materialService.getAll().subscribe(response=>{
      response.forEach(element => {
        if (element.id_solicitud==this.solicitudesId) {
          this.material.push(element);
        }
      });
    });
    this.solicitudService.find(this.idN).subscribe((data: Solicitud)=>{
      this.solicitudN = data;
    });
  }
  get f(){
    return this.form.controls;
  }
  verMaterial(){
    this.infoMaterial=!this.infoMaterial;
  }
  submit(){
    console.log(this.form.value);
    this.solicitudService.update(this.idN, this.form.value).subscribe(res => {
      this.form.setValue(
        {
        'estatus':this.solicitudN.estatus,
      });
      console.log('Actualizado y Listo');
    });
  }

}
