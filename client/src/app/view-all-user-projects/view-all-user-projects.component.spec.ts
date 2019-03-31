import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllUserProjectsComponent } from './view-all-user-projects.component';

describe('ViewAllUserProjectsComponent', () => {
  let component: ViewAllUserProjectsComponent;
  let fixture: ComponentFixture<ViewAllUserProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllUserProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
