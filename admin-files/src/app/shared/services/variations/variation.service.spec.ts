import { TestBed } from '@angular/core/testing';

import { VariationService } from './variation.service';

describe('VariationService', () => {
  let service: VariationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
