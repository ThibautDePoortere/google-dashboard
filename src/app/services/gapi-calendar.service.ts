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

  constructor(private gapiRef:GapiRefService) { }

  getCalendarLists = () => {
    this.gapiRef.gapi.client.calendar.calendarList.list({
    }).then(this.updateCalendarList)
  }

  updateCalendarList = (response) => {
    console.log("Response");
    console.log(response.result.items);
    this.calendarListSubject.next(response.result.items);
  }
}
