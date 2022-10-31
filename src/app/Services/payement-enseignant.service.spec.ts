import { TestBed } from '@angular/core/testing';

import { PayementEnseignantService } from './payement-enseignant.service';

describe('PayementEnseignantService', () => {
  let service: PayementEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayementEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
