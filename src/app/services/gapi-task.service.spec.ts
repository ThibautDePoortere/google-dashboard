import { TestBed } from '@angular/core/testing';

import { GapiTaskService } from './gapi-task.service';

describe('GapiTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GapiTaskService = TestBed.get(GapiTaskService);
    expect(service).toBeTruthy();
  });
});
