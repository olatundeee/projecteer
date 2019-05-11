import { TestBed } from '@angular/core/testing';

import { TaskApplicationService } from './task-application.service';

describe('TaskApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskApplicationService = TestBed.get(TaskApplicationService);
    expect(service).toBeTruthy();
  });
});
