import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDirectorComponent } from './login-director.component';

describe('LoginDirectorComponent', () => {
  let component: LoginDirectorComponent;
  let fixture: ComponentFixture<LoginDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginDirectorComponent]
    });
    fixture = TestBed.createComponent(LoginDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
