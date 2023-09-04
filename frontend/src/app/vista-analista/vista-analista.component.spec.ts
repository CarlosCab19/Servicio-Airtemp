import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAnalistaComponent } from './vista-analista.component';

describe('VistaAnalistaComponent', () => {
  let component: VistaAnalistaComponent;
  let fixture: ComponentFixture<VistaAnalistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAnalistaComponent]
    });
    fixture = TestBed.createComponent(VistaAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
