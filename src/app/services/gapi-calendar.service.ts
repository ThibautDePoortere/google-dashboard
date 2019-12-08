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
    this.calendarEventsSubject.next(response.result.items);
  }

  newCalendarEvent = (calendarId:string, naamEvent:string, startTijdCalendarEvent:string, eindTijdCalendarEvent:string) => {
    console.log(startTijdCalendarEvent);
    console.log(new Date(startTijdCalendarEvent));
    console.log(eindTijdCalendarEvent);
    console.log(new Date(eindTijdCalendarEvent));
    this.gapiRef.gapi.client.calendar.events.insert({
      'calendarId': calendarId,
      'summary': naamEvent,
      'start': new Date("2020"),
      'end': new Date(eindTijdCalendarEvent)
    }).then((result) => {
      this.getCalendarEvents(calendarId)
    })
  }

  updateTitelCalendarEvent = (calendarId:string, calendarEventId:string, naamEvent:string) => {
    this.gapiRef.gapi.client.calendar.events.patch({
      'calendarId': calendarId,
      'eventId': calendarEventId,
      'summary': naamEvent
    }).then((result) => {
      this.getCalendarEvents(calendarId);
    })
  }

  deleteCalendarEvent = (calendarId:string, calendarEventId:string) => {
    this.gapiRef.gapi.client.calendar.events.delete({
      'calendarId': calendarId,
      'eventId': calendarEventId
    }).then((result) => {
      this.getCalendarEvents(calendarId)
    })
  }
  // =======================================================
}
