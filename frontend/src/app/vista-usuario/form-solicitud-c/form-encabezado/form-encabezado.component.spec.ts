import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEncabezadoComponent } from './form-encabezado.component';

describe('FormEncabezadoComponent', () => {
  let component: FormEncabezadoComponent;
  let fixture: ComponentFixture<FormEncabezadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEncabezadoComponent]
    });
    fixture = TestBed.createComponent(FormEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
