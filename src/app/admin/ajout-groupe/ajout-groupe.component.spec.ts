import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutGroupeComponent } from './ajout-groupe.component';

describe('AjoutGroupeComponent', () => {
  let component: AjoutGroupeComponent;
  let fixture: ComponentFixture<AjoutGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
