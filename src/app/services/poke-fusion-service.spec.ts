import { TestBed } from '@angular/core/testing';

import { PokeFusionService } from './poke-fusion-service';

describe('PokeFusionService', () => {
  let service: PokeFusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeFusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
