import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-masinfo-soli',
  templateUrl: './masinfo-soli.component.html',
  styleUrls: ['./masinfo-soli.component.css']
})
export class MasinfoSoliComponent implements OnInit{
  id!:number;
  solicitud!:Solicitud;
  form!:FormGroup;
  @Input() solicitudes:Solicitud[]=[];

  constructor(private router:Router,
    private solicitudService:SolicitudService,public route: ActivatedRoute,){

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.solicitudService.find(this.id).subscribe((data: Solicitud)=>{
      this.solicitud = data;
    });

    this.form = new FormGroup({
      fechasolicitud : new FormControl('',Validators.required),
      estatus : new FormControl('',Validators.required),
      solicitante : new FormControl('',Validators.required),
      codigoproveedor : new FormControl('',Validators.required),
      razonsocial : new FormControl('',Validators.required),
      codigo : new FormControl('',Validators.required),
      descripcion : new FormControl('',Validators.required),
      tipofamilia : new FormControl('',Validators.required),
      caracteristicaone : new FormControl('',Validators.required),
      caracteristicatwo : new FormControl('',Validators.required),
      caracteristicathree : new FormControl('',Validators.required),
      caracteristicafour : new FormControl('',Validators.required),
      caracteristicafive : new FormControl('',Validators.required),
      nombrecliente : new FormControl('',Validators.required),
      numparte : new FormControl('',Validators.required),
    });

  }
  get f(){
    return this.form.controls;
  }


}
