import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdministradorComponent } from './login-administrador.component';

describe('LoginAdministradorComponent', () => {
  let component: LoginAdministradorComponent;
  let fixture: ComponentFixture<LoginAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAdministradorComponent]
    });
    fixture = TestBed.createComponent(LoginAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
