import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { GapiCalendarService } from 'src/app/services/gapi-calendar.service';
import { GapiAuthenticateService } from 'src/app/services/gapi-authenticate.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-lists',
  templateUrl: './calendar-lists.component.html',
  styleUrls: ['./calendar-lists.component.css']
})
export class CalendarListsComponent implements OnInit {
  @Output() selectedCalendarList = new EventEmitter<string>();
  calendarListValue:string = '';
  isSignedIn:boolean;
  calendarListItems:any;

  constructor(private gapiRef:GapiRefService, private gapiCalendarService:GapiCalendarService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) { }

  ngOnInit() {
    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.gapiCalendarService.calendarListObservable.subscribe((calendarLists) => {
      this.ngZone.run(() => {
        this.aanpassenCalendarLists(calendarLists);
      });
    });

    this.updateCalendarLists();
  }


  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
    this.updateCalendarLists();
  }

  aanpassenCalendarLists = (calendarLists) => {
    this.calendarListItems = calendarLists;
  }

  updateCalendarLists = () => {
    if(this.isSignedIn) {
      this.laadCalendarLists();
    } else {
      this.wisCalendarLists();
    }
  }

  changeSelectionCalendarList = () => {
    this.selectedCalendarList.emit(this.calendarListValue);
  }


  // === ACTIONS ===========================
  wisCalendarLists = () => {
    this.calendarListItems = [];
  }

  laadCalendarLists = () => {
    this.gapiCalendarService.getCalendarLists();
  }

}
