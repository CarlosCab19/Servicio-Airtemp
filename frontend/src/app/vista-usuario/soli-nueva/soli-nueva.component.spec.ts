import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliNuevaComponent } from './soli-nueva.component';

describe('SoliNuevaComponent', () => {
  let component: SoliNuevaComponent;
  let fixture: ComponentFixture<SoliNuevaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoliNuevaComponent]
    });
    fixture = TestBed.createComponent(SoliNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
