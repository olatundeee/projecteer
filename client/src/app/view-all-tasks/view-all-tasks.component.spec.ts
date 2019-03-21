import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTasksComponent } from './view-all-tasks.component';

describe('ViewAllTasksComponent', () => {
  let component: ViewAllTasksComponent;
  let fixture: ComponentFixture<ViewAllTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
