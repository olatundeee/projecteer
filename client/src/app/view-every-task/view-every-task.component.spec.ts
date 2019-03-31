import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEveryTaskComponent } from './view-every-task.component';

describe('ViewEveryTaskComponent', () => {
  let component: ViewEveryTaskComponent;
  let fixture: ComponentFixture<ViewEveryTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEveryTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEveryTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
