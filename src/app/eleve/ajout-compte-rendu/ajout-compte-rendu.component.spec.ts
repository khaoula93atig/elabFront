import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCompteRenduComponent } from './ajout-compte-rendu.component';

describe('AjoutCompteRenduComponent', () => {
  let component: AjoutCompteRenduComponent;
  let fixture: ComponentFixture<AjoutCompteRenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutCompteRenduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCompteRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
