import { TestBed, inject } from '@angular/core/testing';

import { SizeConvectorService } from './size-convector.service';

describe('SizeConvectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SizeConvectorService]
    });
  });

  it('should be created', inject([SizeConvectorService], (service: SizeConvectorService) => {
    expect(service).toBeTruthy();
  }));
});
