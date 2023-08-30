import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTiComponent } from './login-ti.component';

describe('LoginTiComponent', () => {
  let component: LoginTiComponent;
  let fixture: ComponentFixture<LoginTiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginTiComponent]
    });
    fixture = TestBed.createComponent(LoginTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
