import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTeamComponent } from './admin-view-team.component';

describe('AdminViewTeamComponent', () => {
  let component: AdminViewTeamComponent;
  let fixture: ComponentFixture<AdminViewTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
