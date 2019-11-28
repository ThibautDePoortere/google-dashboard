import { TestBed } from '@angular/core/testing';

import { GapiCalendarService } from './gapi-calendar.service';

describe('GapiCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GapiCalendarService = TestBed.get(GapiCalendarService);
    expect(service).toBeTruthy();
  });
});
