import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllUserTeamsComponent } from './view-all-user-teams.component';

describe('ViewAllUserTeamsComponent', () => {
  let component: ViewAllUserTeamsComponent;
  let fixture: ComponentFixture<ViewAllUserTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllUserTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllUserTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
