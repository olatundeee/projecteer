import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllUserTasksComponent } from './view-all-user-tasks.component';

describe('ViewAllUserTasksComponent', () => {
  let component: ViewAllUserTasksComponent;
  let fixture: ComponentFixture<ViewAllUserTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllUserTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllUserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
