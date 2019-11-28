import { TestBed } from '@angular/core/testing';

import { GapiAuthenticateService } from './gapi-authenticate.service';

describe('GapiAuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GapiAuthenticateService = TestBed.get(GapiAuthenticateService);
    expect(service).toBeTruthy();
  });
});
