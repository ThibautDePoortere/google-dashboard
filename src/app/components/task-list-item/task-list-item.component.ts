import { Component, OnInit, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { GapiTaskService } from 'src/app/services/gapi-task.service';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  @Input() taskList:any;

  constructor(private gapiRef:GapiRefService, private gapiTaskService:GapiTaskService, private ngZone:NgZone, private router:Router) {
  }

  ngOnInit() {
  }


  // === ACTIONS ===========================
  NavigateToTaskListItem = (taskListId) => {
    this.ngZone.run(() => {
      this.router.navigate(["taskList", taskListId]);
    });
  }

  DeleteTaskListItem = (taskListId) => {
    this.gapiTaskService.deleteTaskList(taskListId);
  }

  FormatDate(date : string) {
    return formatDate(date, 'dd/MM/yyyy', 'en-us');
  }

}
