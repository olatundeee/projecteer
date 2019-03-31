import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEveryProjectComponent } from './view-every-project.component';

describe('ViewEveryProjectComponent', () => {
  let component: ViewEveryProjectComponent;
  let fixture: ComponentFixture<ViewEveryProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEveryProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEveryProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
