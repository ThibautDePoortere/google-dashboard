import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-calendar-wrap',
  templateUrl: './calendar-wrap.component.html',
  styleUrls: ['./calendar-wrap.component.css']
})
export class CalendarWrapComponent implements OnInit {
  selectedCalendarList:string = '';

  constructor(private ngZone:NgZone) { }

  ngOnInit() {
  }

  updateSelectedCalendarList = (selectedList:string) => {
    if(selectedList != '') {
      this.ngZone.run(() => {
        this.selectedCalendarList = selectedList;
      })
    }
  }

}
