import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { GapiAuthenticateService } from 'src/app/services/gapi-authenticate.service';
import { GapiCalendarService } from 'src/app/services/gapi-calendar.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-calendar-event-item-details',
  templateUrl: './calendar-event-item-details.component.html',
  styleUrls: ['./calendar-event-item-details.component.css']
})
export class CalendarEventItemDetailsComponent implements OnInit {
  @Input() calendarId = '';
  @Output() annuleer = new EventEmitter();
  isSignedIn:boolean;

  titelWaarde:string = '';
  titelFormControl = new FormControl('', [
    Validators.required
  ]);
  titelErrorMatcher = new MyErrorStateMatcher();

  startTijdaarde:string = '';
  startTijdFormControl = new FormControl('', [
    Validators.required
  ]);
  startTijdErrorMatcher = new MyErrorStateMatcher();

  eindTijdaarde:string = '';
  eindTijdFormControl = new FormControl('', [
    Validators.required
  ]);
  eindTijdErrorMatcher = new MyErrorStateMatcher();

  constructor(private gapiCalendarService:GapiCalendarService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) { }

  ngOnInit() {

    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
  }



  MaakNieuwCalendarEventAan = (naamCalendarEvent:string, startTijdCalendarEvent:string, eindTijdCalendarEvent:string) => {
    this.gapiCalendarService.newCalendarEvent(this.calendarId, naamCalendarEvent, startTijdCalendarEvent, eindTijdCalendarEvent);
    this.annuleer.emit();
  }

}
