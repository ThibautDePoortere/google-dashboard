import { Injectable } from '@angular/core';
import { GapiRefService } from './gapi-ref.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GapiCalendarService {
  maxCaldendarListsResult:number = 10;

  calendarSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calendarObservable = this.calendarSubject.asObservable();

  calendarListSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calendarListObservable = this.calendarListSubject.asObservable();

  calendarEventsSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calendarEventsObservable = this.calendarEventsSubject.asObservable();

  constructor(private gapiRef:GapiRefService) { }

  // =======================================================
  // === CalendarList(s) ===================================
  // =======================================================
  getCalendarLists = () => {
    this.gapiRef.gapi.client.calendar.calendarList.list({
    }).then(this.publishCalendarList)
  }
  publishCalendarList = (response) => {
    this.calendarListSubject.next(response.result.items);
  }
  // =======================================================


  // =======================================================
  // === Calendar ==========================================
  // =======================================================
  getCalendar = (calendarId:string) => {
    this.gapiRef.gapi.client.calendar.calendars.get({
      'calendarId': calendarId
    }).then(this.publishCalendar)
  }
  publishCalendar = (response) => {
    this.calendarSubject.next(response.result.items);
  }
  // =======================================================


  // =======================================================
  // === CalendarEvent(s) ==================================
  // =======================================================
  getCalendarEvents = (calendarId:string) => {
    this.gapiRef.gapi.client.calendar.events.list({
      'calendarId': calendarId
    }).then(this.publishCalendarEvents)
  }
  publishCalendarEvents = (response) => {
    console.log("events Response");
    console.log(response);
    console.log(response.description);
    this.calendarEventsSubject.next(response.result.items);
  }
  // =======================================================
}
