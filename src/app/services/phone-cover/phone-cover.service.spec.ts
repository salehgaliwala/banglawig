import { TestBed } from '@angular/core/testing';

import { PhoneCoverService } from './phone-cover.service';

describe('PhoneCoverService', () => {
  let service: PhoneCoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneCoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
