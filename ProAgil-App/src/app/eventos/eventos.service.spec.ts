/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventosService } from './eventos.service';

describe('Service: Eventos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventosService]
    });
  });

  it('should ...', inject([EventosService], (service: EventosService) => {
    expect(service).toBeTruthy();
  }));
});
