import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateTeamMemberComponent } from './delegate-team-member.component';

describe('DelegateTeamMemberComponent', () => {
  let component: DelegateTeamMemberComponent;
  let fixture: ComponentFixture<DelegateTeamMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateTeamMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
