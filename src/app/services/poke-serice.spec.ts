import { TestBed } from '@angular/core/testing';

import { PokeSerice } from './poke-serice';

describe('PokeSerice', () => {
  let service: PokeSerice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeSerice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
