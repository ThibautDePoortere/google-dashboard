import { Component, OnInit, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { GapiTaskService } from 'src/app/services/gapi-task.service';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task;
  @Input() subTasks;
  @Input() taskListId;
  subTaskItems=[];
  isChecked:boolean;

  constructor(private gapiRef:GapiRefService, private gapiTaskService:GapiTaskService, private ngZone:NgZone) {
  }

  ngOnInit() {
    this.getSubTasksVanDitItem();

    if(this.task.status == 'needsAction') {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  DeleteTaskItem = (taskId:any) => {
    this.gapiTaskService.deleteTask(this.taskListId, taskId);
  }

  FormatDate = (date : string) => {
    return formatDate(date, 'dd/MM/yyyy', 'en-us');
  }

  clickCheckbox = (taskId:any) => {
    this.gapiTaskService.changeStatusTask(this.taskListId, taskId, this.isChecked)
  }

  getSubTasksVanDitItem = () => {
    if(this.subTasks!=undefined) {
      for (let index = 0; index < this.subTasks.length; index++) {
        const element = this.subTasks[index];
        if(element.parent==this.task.id) {
          this.subTaskItems.push(element);
        }
      }
    } else {
      this.subTasks=[];
    }
    
  }

}
