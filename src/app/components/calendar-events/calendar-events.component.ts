import { Component, OnInit, NgZone, Input } from '@angular/core';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { GapiCalendarService } from 'src/app/services/gapi-calendar.service';
import { GapiAuthenticateService } from 'src/app/services/gapi-authenticate.service';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.css']
})
export class CalendarEventsComponent implements OnInit {
  @Input() selectedCalendarId:string;
  isSignedIn:boolean;
  calendarEventItems:any;
  DetailsCalendarEventZichtbaar:boolean = true;

  constructor(private gapiRef:GapiRefService, private gapiCalendarService:GapiCalendarService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) {
    this.wisCalendarEvents();
  }

  ngOnInit() {
    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.gapiCalendarService.calendarEventsObservable.subscribe((calendarEvents) => {
      this.ngZone.run(() => {
        console.log("* Events ontvangen:");
        console.log(calendarEvents);
        this.aanpassenCalendarEvents(calendarEvents);
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

  aanpassenCalendarEvents = (calendarEvents) => {
    this.calendarEventItems = calendarEvents;
  }


  updateCalendarEvents = () => {
    if(this.isSignedIn) {
      this.laadCalendarEvents();
    } else {
      this.wisCalendarEvents();
    }
  }



   // === ACTIONS ===========================
   wisCalendarEvents = () => {
    this.calendarEventItems = [];
  }

  laadCalendarEvents = () => {
    if(!(this.selectedCalendarId == '' || this.selectedCalendarId == undefined)) {
      this.gapiCalendarService.getCalendarEvents(this.selectedCalendarId);
    }
  }

  ToonDetailsCalendarEvents = () => {
    this.ngZone.run(() => {
      this.DetailsCalendarEventZichtbaar = true;
    })
  }

  VerbergDetailsCalendarEvents = () => {
    this.ngZone.run(() => {
      this.DetailsCalendarEventZichtbaar = false;
    })
  }

}
