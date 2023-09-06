import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorCotizarComponent } from './por-cotizar.component';

describe('PorCotizarComponent', () => {
  let component: PorCotizarComponent;
  let fixture: ComponentFixture<PorCotizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorCotizarComponent]
    });
    fixture = TestBed.createComponent(PorCotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
