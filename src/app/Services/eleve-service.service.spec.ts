import { TestBed } from '@angular/core/testing';

import { EleveServiceService } from './eleve-service.service';

describe('EleveServiceService', () => {
  let service: EleveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EleveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
