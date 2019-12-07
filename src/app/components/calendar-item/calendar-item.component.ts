import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GapiAuthenticateService } from 'src/app/services/gapi-authenticate.service';
import { GapiCalendarService } from 'src/app/services/gapi-calendar.service';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {
  @Input() selectedCalendarList:string;
  isSignedIn:boolean;
  calendarMetadata:any;
  calendarEvents:any;

  constructor(private gapiAuthService:GapiAuthenticateService, private gapiCalendarService:GapiCalendarService , private ngZone:NgZone) { }

  ngOnInit() {
    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.gapiCalendarService.calendarEventsObservable.subscribe((events) => {
      this.ngZone.run(() => {
        this.aanpassenCalendarEvents(events);
      });
    });

    this.updateCalendarEvents();
  }

  ngOnChanges() {
    this.updateCalendarEvents();
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
    this.updateCalendarEvents();
  }

  aanpassenCalendarEvents = (events) => {
    this.calendarEvents = events;
    console.log("Events: ");
    console.log(events);
  }

  updateCalendarEvents = () => {
    if(this.isSignedIn) {
      this.laadCalendarEvents();
    } else {
      this.wisCalendarEvents();
    }
  }

  wisCalendarEvents = () => {
    this.calendarEvents = '';
  }

  laadCalendarEvents = () => {
    if(this.selectedCalendarList != '') {
      this.gapiCalendarService.getCalendarEvents(this.selectedCalendarList);
    } else {
      this.wisCalendarEvents();
    }
  }
}
