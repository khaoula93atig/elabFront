import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementEleveComponent } from './paiement-eleve.component';

describe('PaiementEleveComponent', () => {
  let component: PaiementEleveComponent;
  let fixture: ComponentFixture<PaiementEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
