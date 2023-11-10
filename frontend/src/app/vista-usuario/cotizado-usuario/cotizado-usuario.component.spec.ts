import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadoUsuarioComponent } from './cotizado-usuario.component';

describe('CotizadoUsuarioComponent', () => {
  let component: CotizadoUsuarioComponent;
  let fixture: ComponentFixture<CotizadoUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotizadoUsuarioComponent]
    });
    fixture = TestBed.createComponent(CotizadoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
