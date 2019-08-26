import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatMessageComponent } from './group-chat-message.component';

describe('GroupChatMessageComponent', () => {
  let component: GroupChatMessageComponent;
  let fixture: ComponentFixture<GroupChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
