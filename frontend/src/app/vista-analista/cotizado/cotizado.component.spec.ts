import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadoComponent } from './cotizado.component';

describe('CotizadoComponent', () => {
  let component: CotizadoComponent;
  let fixture: ComponentFixture<CotizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotizadoComponent]
    });
    fixture = TestBed.createComponent(CotizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
