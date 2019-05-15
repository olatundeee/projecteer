import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskApplicantsComponent } from './view-task-applicants.component';

describe('ViewTaskApplicantsComponent', () => {
  let component: ViewTaskApplicantsComponent;
  let fixture: ComponentFixture<ViewTaskApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
