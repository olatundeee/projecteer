import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicantProfileComponent } from './view-applicant-profile.component';

describe('ViewApplicantProfileComponent', () => {
  let component: ViewApplicantProfileComponent;
  let fixture: ComponentFixture<ViewApplicantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApplicantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
