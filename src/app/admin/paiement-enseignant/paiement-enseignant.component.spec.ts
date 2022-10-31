import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementEnseignantComponent } from './paiement-enseignant.component';

describe('PaiementEnseignantComponent', () => {
  let component: PaiementEnseignantComponent;
  let fixture: ComponentFixture<PaiementEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
