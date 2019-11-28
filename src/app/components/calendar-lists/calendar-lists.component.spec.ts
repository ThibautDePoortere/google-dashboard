import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarListsComponent } from './calendar-lists.component';

describe('CalendarListsComponent', () => {
  let component: CalendarListsComponent;
  let fixture: ComponentFixture<CalendarListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
