import { TestBed } from '@angular/core/testing';

import { CardsProjetosService } from './cards-projetos.service';

describe('CardsProjetosService', () => {
  let service: CardsProjetosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsProjetosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
