import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencidaComponent } from './vencida.component';

describe('VencidaComponent', () => {
  let component: VencidaComponent;
  let fixture: ComponentFixture<VencidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VencidaComponent]
    });
    fixture = TestBed.createComponent(VencidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
