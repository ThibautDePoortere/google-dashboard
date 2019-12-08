import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventItemComponent } from './calendar-event-item.component';

describe('CalendarEventItemComponent', () => {
  let component: CalendarEventItemComponent;
  let fixture: ComponentFixture<CalendarEventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
