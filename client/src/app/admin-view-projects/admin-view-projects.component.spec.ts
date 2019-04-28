import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewProjectsComponent } from './admin-view-projects.component';

describe('AdminViewProjectsComponent', () => {
  let component: AdminViewProjectsComponent;
  let fixture: ComponentFixture<AdminViewProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
