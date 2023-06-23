import { TestBed } from '@angular/core/testing';

import { HttpCustomInterceptorService } from './http-custom-interceptor.service';

describe('HttpCustomInterceptorService', () => {
  let service: HttpCustomInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCustomInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
