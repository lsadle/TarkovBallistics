import { TestBed } from '@angular/core/testing';

import { TarkovBallisticesService } from './tarkov-ballistices.service';

describe('TarkovBallisticesService', () => {
  let service: TarkovBallisticesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarkovBallisticesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
