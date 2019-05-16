import { TestBed } from '@angular/core/testing';

import { TaskDelegationService } from './task-delegation.service';

describe('TaskDelegationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDelegationService = TestBed.get(TaskDelegationService);
    expect(service).toBeTruthy();
  });
});
