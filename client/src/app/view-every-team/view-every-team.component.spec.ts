import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEveryTeamComponent } from './view-every-team.component';

describe('ViewEveryTeamComponent', () => {
  let component: ViewEveryTeamComponent;
  let fixture: ComponentFixture<ViewEveryTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEveryTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEveryTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
