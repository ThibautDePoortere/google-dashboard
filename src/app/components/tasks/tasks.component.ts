import { Component, OnInit, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { GapiRefService } from '../../services/gapi-ref.service';
import { GapiTaskService } from '../../services/gapi-task.service';
import { GapiAuthenticateService } from '../../services/gapi-authenticate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskListId:any;
  taskListItem:any;
  taskItems:any;
  subTaskItems:any;
  isSignedIn:boolean;
  DetailsTaaklijstZichtbaar:boolean = false;
  DetailsTaakZichtbaar:boolean = false;

  constructor(private gapiRef:GapiRefService, private gapiTaskService:GapiTaskService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone, private route: ActivatedRoute) {
    this.wisTasks();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taskListId = params.get('taskListId');
    });

    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.gapiTaskService.taskListObservable.subscribe((taskList) => {
      this.ngZone.run(() => {
        this.aanpassenTaskList(taskList);
      });
    });

    this.gapiTaskService.tasksLevel0Observable.subscribe((tasks) => {
      this.ngZone.run(() => {
        this.aanpassenTasks(tasks);
      });
    });

    this.gapiTaskService.tasksLevel1Observable.subscribe((tasks) => {
      this.ngZone.run(() => {
        this.aanpassenSubTasks(tasks);
      });
    });

    this.updateTaskListItem(this.taskListId);
    this.updateTasks();
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
    this.updateTaskListItem(this.taskListId);
    this.updateTasks();
  }

  aanpassenTaskList = (taskList) => {
    this.taskListItem = taskList;
  }

  aanpassenTasks = (tasks) => {
    this.taskItems = tasks;
  }

  aanpassenSubTasks = (tasks) => {
    this.subTaskItems = tasks;
  }

  updateTaskListItem = (taskListId:string) => {
    if(this.isSignedIn) {
      this.laadTaskListItem(taskListId);
    } else {
      this.wisTaskListItem();
    }
  }

  updateTasks = () => {
    if(this.isSignedIn) {
      this.laadTasks();
    } else {
      this.wisTasks();
    }
  }



   // === ACTIONS ===========================
  wisTaskListItem = () => {
    this.taskListItem = [];
  }

   wisTasks = () => {
    this.taskItems = [];
  }

  laadTaskListItem = (taskListId:string) => {
    this.gapiTaskService.getTaskList(taskListId);
  }

  laadTasks = () => {
    this.gapiTaskService.getTasks(this.taskListId);
  }

  wisVoltooideTaken = () => {
    this.gapiTaskService.clearCompletedTasks(this.taskListId);
  }

  ToonDetailsTaaklijst = () => {
    this.ngZone.run(() => {
      this.DetailsTaaklijstZichtbaar = true;
    })
  }
  
  ToonDetailsTaak = () => {
    this.ngZone.run(() => {
      this.DetailsTaakZichtbaar = true;
    })
  }

  VerbergDetailsTaaklijst = () => {
    this.ngZone.run(() => {
      this.DetailsTaaklijstZichtbaar = false;
    })
  }

  VerbergDetailsTaak = () => {
    this.ngZone.run(() => {
      this.DetailsTaakZichtbaar = false;
    })
  }

}
