import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personal } from 'src/app/shared/personal';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.css']
})
export class EditPersonalComponent implements OnInit{


  id!:number;
  personal!:Personal;

  constructor(public personalService: PersonalService,
    public route: ActivatedRoute,
    public router: Router){}

  form = new FormGroup({
    nombres:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    apellidos:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
    departamento: new FormControl('', [ Validators.required, Validators.pattern('^(Solicitante|Analista|Director|Soporte)$') ]),
    usuario: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]+$')]),
    contra: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ0-9]+$')]),
    estatus:  new FormControl('', [ Validators.required, Validators.pattern('^(Activo|Inactivo)$') ]),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.personalService.find(this.id).subscribe((data: Personal)=>{
      this.personal = data;
      this.form.patchValue(data);
    });
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    this.personalService.update(this.id, this.form.value).subscribe(res => {
         console.log('Person updated successfully!');
         this.router.navigate(['/soporte/', this.id]);
    })
  }

}
