import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { GapiCalendarService } from 'src/app/services/gapi-calendar.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-calendar-event-item',
  templateUrl: './calendar-event-item.component.html',
  styleUrls: ['./calendar-event-item.component.css']
})
export class CalendarEventItemComponent implements OnInit {
  @Input() calendarId:string;
  @Input() calendarEvent:any;
  bewerken:boolean = false;

  titelWaarde:string = '';
  titelFormControl = new FormControl('', [
    Validators.required
  ]);
  titelErrorMatcher = new MyErrorStateMatcher();

  constructor(private gapiRef:GapiRefService, private gapiCalendarService:GapiCalendarService, private ngZone:NgZone, private router:Router) {
  }

  ngOnInit() {
  }


  // === ACTIONS ===========================
  NavigateToCalendarEventItem = (calendarEventId) => {
    this.ngZone.run(() => {
      this.router.navigate(["calendarEvent", calendarEventId]);
    });
  }

  DeleteCalendarEventItem = (calendarId, calendarEventId) => {
    this.gapiCalendarService.deleteCalendarEvent(calendarId, calendarEventId);
  }

  FormatDate(date : string) {
    return formatDate(date, 'dd/MM/yyyy', 'en-us');
  }

  EditCalendarEventItem = () => {
    this.ngZone.run(() => {
      this.titelWaarde = this.calendarEvent.summary;
      this.bewerken = !this.bewerken;
    })
  }

  cancelEditCalendarEventItem = () => {
    this.ngZone.run(() => {
      this.bewerken = !this.bewerken;
    })
  }

  updateCalendarEventItem = (calendarId:string, calendarEventId:string, naamEvent:string) => {
    this.ngZone.run(() => {
      this.gapiCalendarService.updateTitelCalendarEvent(calendarId, calendarEventId, naamEvent);
      this.bewerken = !this.bewerken;
    })
  }

}
