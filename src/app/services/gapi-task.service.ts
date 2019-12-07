import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GapiRefService } from './gapi-ref.service';
import { ElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GapiTaskService {
  maxTaskListsResult:number = 10;
  
  taskListSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  taskListObservable = this.taskListSubject.asObservable();

  taskListsSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  taskListsObservable = this.taskListsSubject.asObservable();

  tasksLevel0Subject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  tasksLevel0Observable = this.tasksLevel0Subject.asObservable();

  tasksLevel1Subject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  tasksLevel1Observable = this.tasksLevel1Subject.asObservable();

  // tasksSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // tasksObservable = this.tasksSubject.asObservable();

  // taskSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // taskObservable = this.taskSubject.asObservable();


  constructor(private gapiRef:GapiRefService) {
  }

  
  // =======================================================
  // === TaskList(s) =======================================
  // =======================================================
  getTaskList = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasklists.get({
      'tasklist': taskListId
    }).then(this.publishTaskList)
  }
  publishTaskList = (response) => {
    this.taskListSubject.next(response.result);
  }

  getTaskLists = () => {
    this.gapiRef.gapi.client.tasks.tasklists.list({
      'maxResults': this.maxTaskListsResult
    }).then(this.publishTaskLists)
  }
  publishTaskLists = (response) => {
    this.taskListsSubject.next(response.result.items);
  }

  newTaskList = (naamLijst:string) => {
    this.gapiRef.gapi.client.tasks.tasklists.insert({
      "title": naamLijst
    }).then((response) => {
      this.getTaskLists();
    });
  }

  updateTitelTaskList = (taskListId:string, nieuweNaamLijst:string) => {
    if(!(nieuweNaamLijst == undefined || nieuweNaamLijst == '')) {
      this.gapiRef.gapi.client.tasks.tasklists.patch({
        'tasklist': taskListId,
        'title': nieuweNaamLijst
      }).then((response) => {
        this.getTaskLists();
        this.getTaskList(taskListId);
      })
    }
  }

  deleteTaskList = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasklists.delete({
      'tasklist': taskListId
    }).then((response) => {
      this.getTaskLists();
    });
  }
  // =======================================================





  // =======================================================
  // === Task(s) ===========================================
  // =======================================================
  // getTask = (taskListId:string, taskId:string) => {
  //   this.gapiRef.gapi.client.tasks.tasks.get({
  //     'tasklist': taskListId,
  //     'task': taskId
  //   }).then(this.publishTask)
  // }
  // publishTask = (response) => {
  //   // this.taskSubject.next(response.result);
  // }

  getTasks = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.list({
      'tasklist': taskListId,
      'maxResults': this.maxTaskListsResult
    }).then(this.publishTasks)
  }
  publishTasks = (response) => {
    this.publishTasksLevel1(response);
    this.publishTasksLevel0(response);
  }
  publishTasksLevel0 = (response) => {
    var tasksLevel0=[];
    if(response.result.items!=undefined) {
      for (let index = 0; index < response.result.items.length; index++) {
        const element = response.result.items[index];
        if(!element.parent) {
          tasksLevel0.push(element);
        }
      }
    } else {
      tasksLevel0=[];
    }
    this.tasksLevel0Subject.next(tasksLevel0)
  }
  publishTasksLevel1 = (response) => {
    var tasksLevel1=[];
    if(response.result.items!=undefined) {
      for (let index = 0; index < response.result.items.length; index++) {
        const element = response.result.items[index];
        if(element.parent) {
          tasksLevel1.push(element);
        }
      }
    } else {
      tasksLevel1=[];
    }
    this.tasksLevel1Subject.next(tasksLevel1)
  }

  newTask:any = (taskListId:string, naamTask:string, ouder:string) => {
    this.gapiRef.gapi.client.tasks.tasks.insert({
      "tasklist": taskListId,
      "title": naamTask,
      "parent": ouder
    }).then((response) => {
      this.getTasks(taskListId);
    });
  }

  updateStatusTask = (taskListId:string, taskId:string, isChecked:boolean) => {
    status="";
    if(isChecked) {
      status="needsAction";
    } else {
      status="completed";
    }

    this.gapiRef.gapi.client.tasks.tasks.patch({
      'tasklist': taskListId,
      'task': taskId,
      'status': status
    }).then((response) => {
      this.getTasks(taskListId);
    })
  }

  updateTitelTask = (taskListId:string, taskId:string, nieuweNaamTask:string, ouder:string) => {
    if(!(nieuweNaamTask == undefined || nieuweNaamTask == '')) {
      this.gapiRef.gapi.client.tasks.tasks.patch({
        'tasklist': taskListId,
        'task': taskId,
        'title': nieuweNaamTask,
        'parent': ouder
      }).then((response) => {
        this.getTasks(taskListId);
      })
    }
  }

  deleteTask = (taskListId:string, taskId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.delete({
      'tasklist': taskListId,
      'task': taskId
    }).then((response) => {
      this.getTasks(taskListId);
    })
  }

  clearCompletedTasks = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.clear({
      'tasklist': taskListId
    }).then((response) => {
      this.getTasks(taskListId);
    })
  }
  // =======================================================
}
