import { TestBed } from '@angular/core/testing';

import { SuccesService } from './succes.service';

describe('SuccesService', () => {
  let service: SuccesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
