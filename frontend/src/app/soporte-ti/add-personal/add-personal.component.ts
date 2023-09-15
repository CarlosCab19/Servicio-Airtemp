import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.css']
})
export class AddPersonalComponent implements OnInit{
  id!:number;
  form!: FormGroup;

  constructor(public personalService:PersonalService,public router:Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombres:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      apellidos:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      departamento: new FormControl('', [ Validators.required, Validators.pattern('^(Solicitante|Analista|Director|Soporte)$') ]),
      usuario:  new FormControl('', [ Validators.required, Validators.pattern('^[A-Za-z0-9]+$') ]),
      contra:  new FormControl('', [ Validators.required, Validators.pattern('^[A-Za-z0-9]+$') ]),
      estatus:  new FormControl('', [ Validators.required, Validators.pattern('^(Activo|Inactivo)$') ]),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.personalService.create(this.form.value).subscribe(res => {
         console.log('Person created successfully!');
         /*this.router.navigate(['/soporte/', this.id]);*/
         this.router.navigateByUrl('/soporte/:id');
    })
  }

}
