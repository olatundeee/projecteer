import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserTeamsComponent } from './view-user-teams.component';

describe('ViewUserTeamsComponent', () => {
  let component: ViewUserTeamsComponent;
  let fixture: ComponentFixture<ViewUserTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
