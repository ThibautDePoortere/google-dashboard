import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWrapComponent } from './calendar-wrap.component';

describe('CalendarWrapComponent', () => {
  let component: CalendarWrapComponent;
  let fixture: ComponentFixture<CalendarWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
