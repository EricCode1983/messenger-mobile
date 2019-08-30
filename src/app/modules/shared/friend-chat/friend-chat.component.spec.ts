import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendChatComponent } from './friend-chat.component';

describe('FriendChatComponent', () => {
  let component: FriendChatComponent;
  let fixture: ComponentFixture<FriendChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendChatComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
