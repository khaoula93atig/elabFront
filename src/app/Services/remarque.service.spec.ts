import { TestBed } from '@angular/core/testing';

import { RemarqueService } from './remarque.service';

describe('RemarqueService', () => {
  let service: RemarqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemarqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
