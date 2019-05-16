import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateTaskComponent } from './delegate-task.component';

describe('DelegateTaskComponent', () => {
  let component: DelegateTaskComponent;
  let fixture: ComponentFixture<DelegateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
