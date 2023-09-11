import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazadaComponent } from './rechazada.component';

describe('RechazadaComponent', () => {
  let component: RechazadaComponent;
  let fixture: ComponentFixture<RechazadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechazadaComponent]
    });
    fixture = TestBed.createComponent(RechazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
