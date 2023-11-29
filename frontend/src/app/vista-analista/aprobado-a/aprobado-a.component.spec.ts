import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobadoAComponent } from './aprobado-a.component';

describe('AprobadoAComponent', () => {
  let component: AprobadoAComponent;
  let fixture: ComponentFixture<AprobadoAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobadoAComponent]
    });
    fixture = TestBed.createComponent(AprobadoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
