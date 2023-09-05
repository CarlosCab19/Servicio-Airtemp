import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDirectorComponent } from './vista-director.component';

describe('VistaDirectorComponent', () => {
  let component: VistaDirectorComponent;
  let fixture: ComponentFixture<VistaDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaDirectorComponent]
    });
    fixture = TestBed.createComponent(VistaDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
