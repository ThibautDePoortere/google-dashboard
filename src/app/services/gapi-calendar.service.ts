import { Injectable } from '@angular/core';
import { GapiRefService } from './gapi-ref.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GapiCalendarService {
  maxCaldendarListsResult:number = 10;

  calendarListSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calendarListObservable = this.calendarListSubject.asObservable();

  calendarSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calendarObservable = this.calendarSubject.asObservable();

  calendarEventsSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calendarEventsObservable = this.calendarEventsSubject.asObservable();

  constructor(private gapiRef:GapiRefService) { }

  getCalendarLists = () => {
    this.gapiRef.gapi.client.calendar.calendarList.list({
    }).then(this.updateCalendarList)
  }

  updateCalendarList = (response) => {
    this.calendarListSubject.next(response.result.items);
  }

  //gapi.client.calendars.get({ calendarId: "calendarId",  }); 
  getCalendar = (calendarId:string) => {
    this.gapiRef.gapi.client.calendar.calendars.get({
      'calendarId': calendarId
    }).then(this.updateCalendar)
  }

  updateCalendar = (response) => {
    console.log("Metadata Response");
    console.log(response);
    console.log(response.description);
    //this.calendarMetadataSubject.next(response.result.items);
  }

  getCalendarEvents = (calendarId:string) => {
    this.gapiRef.gapi.client.calendar.events.list({
      'calendarId': calendarId
    }).then(this.updateCalendarEvents)
  }

  updateCalendarEvents = (response) => {
    console.log("events Response");
    console.log(response);
    console.log(response.description);
    this.calendarEventsSubject.next(response.result.items);
  }
}
