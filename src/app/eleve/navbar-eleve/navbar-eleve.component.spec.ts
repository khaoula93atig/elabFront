import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEleveComponent } from './navbar-eleve.component';

describe('NavbarEleveComponent', () => {
  let component: NavbarEleveComponent;
  let fixture: ComponentFixture<NavbarEleveComponent>;

  beforeEach(async (() => {
     TestBed.configureTestingModule({
      declarations: [ NavbarEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
