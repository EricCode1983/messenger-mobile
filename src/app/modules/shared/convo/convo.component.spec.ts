import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoComponent } from './convo.component';

describe('ConvoComponent', () => {
  let component: ConvoComponent;
  let fixture: ComponentFixture<ConvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
