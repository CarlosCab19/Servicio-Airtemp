import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitudCComponent } from './FormSolicitudCComponent';

describe('FormSolicitudCComponent', () => {
  let component: FormSolicitudCComponent;
  let fixture: ComponentFixture<FormSolicitudCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSolicitudCComponent]
    });
    fixture = TestBed.createComponent(FormSolicitudCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
