import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventItemDetailsComponent } from './calendar-event-item-details.component';

describe('CalendarEventItemDetailsComponent', () => {
  let component: CalendarEventItemDetailsComponent;
  let fixture: ComponentFixture<CalendarEventItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
