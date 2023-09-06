import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteTIComponent } from './soporte-ti.component';

describe('SoporteTIComponent', () => {
  let component: SoporteTIComponent;
  let fixture: ComponentFixture<SoporteTIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoporteTIComponent]
    });
    fixture = TestBed.createComponent(SoporteTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
