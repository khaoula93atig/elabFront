import {async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEnseignantComponent } from './navbar-enseignant.component';

describe('NavbarEnseignantComponent', () => {
  let component: NavbarEnseignantComponent;
  let fixture: ComponentFixture<NavbarEnseignantComponent>;

  beforeEach(async (() => {
     TestBed.configureTestingModule({
      declarations: [ NavbarEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
