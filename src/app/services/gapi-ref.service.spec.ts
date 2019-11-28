import { TestBed } from '@angular/core/testing';

import { GapiRefService } from './gapi-ref.service';

describe('GapiRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GapiRefService = TestBed.get(GapiRefService);
    expect(service).toBeTruthy();
  });
});
