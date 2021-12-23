import { TestBed } from '@angular/core/testing';

import { TarkovBallisticsService } from './tarkov-ballistics.service';

describe('TarkovBallisticesService', () => {
  let service: TarkovBallisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarkovBallisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
