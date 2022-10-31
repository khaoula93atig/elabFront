import { TestBed } from '@angular/core/testing';

import { CompteRenduService } from './compte-rendu.service';

describe('CompteRenduService', () => {
  let service: CompteRenduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteRenduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
