import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasinfoSoliComponent } from './masinfo-soli.component';

describe('MasinfoSoliComponent', () => {
  let component: MasinfoSoliComponent;
  let fixture: ComponentFixture<MasinfoSoliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasinfoSoliComponent]
    });
    fixture = TestBed.createComponent(MasinfoSoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
