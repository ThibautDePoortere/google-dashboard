import { Component, OnInit, NgZone } from '@angular/core';
import { GapiRefService } from '../../services/gapi-ref.service';
import { GapiTaskService } from '../../services/gapi-task.service';
import { GapiAuthenticateService } from '../../services/gapi-authenticate.service';
import { GapiCalendarService } from 'src/app/services/gapi-calendar.service';


@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.css']
})
export class TaskListsComponent implements OnInit {
  taskListItems:any;
  isSignedIn:boolean;
  DetailsTaaklijstZichtbaar:boolean = false;

  constructor(private gapiRef:GapiRefService, private gapiTaskService:GapiTaskService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) {
    this.wisTaskLists();
  }

  ngOnInit() {
    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.gapiTaskService.taskListsObservable.subscribe((taskLists) => {
      this.ngZone.run(() => {
        this.aanpassenTaskLists(taskLists);
      });
    });

    this.updateTaskLists();
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
    this.updateTaskLists();
  }

  aanpassenTaskLists = (taskLists) => {
    this.taskListItems = taskLists;
  }


  updateTaskLists = () => {
    if(this.isSignedIn) {
      this.laadTaskLists();
    } else {
      this.wisTaskLists();
    }
  }



   // === ACTIONS ===========================
   wisTaskLists = () => {
    this.taskListItems = [];
  }

  laadTaskLists = () => {
    this.gapiTaskService.getTaskLists();
  }

  ToonDetailsTaaklijst = () => {
    this.ngZone.run(() => {
      this.DetailsTaaklijstZichtbaar = true;
    })
  }

  VerbergDetailsTaaklijst = () => {
    this.ngZone.run(() => {
      this.DetailsTaaklijstZichtbaar = false;
    })
  }

}
