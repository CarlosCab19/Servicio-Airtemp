import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliAprobadaComponent } from './soli-aprobada.component';

describe('SoliAprobadaComponent', () => {
  let component: SoliAprobadaComponent;
  let fixture: ComponentFixture<SoliAprobadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoliAprobadaComponent]
    });
    fixture = TestBed.createComponent(SoliAprobadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
