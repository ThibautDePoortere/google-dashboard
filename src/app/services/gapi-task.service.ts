import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GapiRefService } from './gapi-ref.service';
import { ElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GapiTaskService {
  maxTaskListsResult:number = 10;

  taskListsSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  taskListsObservable = this.taskListsSubject.asObservable();
  
  taskListSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  taskListObservable = this.taskListSubject.asObservable();

  tasksSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  tasksObservable = this.tasksSubject.asObservable();

  tasksZonderSubtasksSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  tasksZonderSubtasksObservable = this.tasksZonderSubtasksSubject.asObservable();

  enkelSubtasksSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  enkelSubtasksObservable = this.enkelSubtasksSubject.asObservable();

  taskSubject:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  taskObservable = this.taskSubject.asObservable();


  constructor(private gapiRef:GapiRefService) {
  }

  // TASKLISTS
  getTaskLists = () => {
    this.gapiRef.gapi.client.tasks.tasklists.list({
      'maxResults': this.maxTaskListsResult
    }).then(this.updateTaskLists)
  }

  getTaskList:any = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasklists.get({
      'tasklist': taskListId
    }).then(this.updateTaskList)
  }

  newTaskList:any = (naamLijst:string) => {
    this.gapiRef.gapi.client.tasks.tasklists.insert({
      "title": naamLijst
    }).then((response) => {
      this.getTaskLists();
      // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
      // Zo hoef je niet alle data te herladen wanener niet nodig!
    });
  }

  changeTitelTaskList = (taskListId:string, nieuweNaam:string) => {
    if(!(nieuweNaam == undefined || nieuweNaam == '')) {
      this.gapiRef.gapi.client.tasks.tasklists.patch({
        'tasklist': taskListId,
        'title': nieuweNaam
      }).then((response) => {
        //this.clearCompletedTasks(taskListId);
        this.getTaskLists();
        this.getTaskList(taskListId);
        // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
        // Zo hoef je niet alle data te herladen wanener niet nodig!
      })
    }
  }

  deleteTaskList = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasklists.delete({
      'tasklist': taskListId
    }).then((response) => {
      this.getTaskLists();
      // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
      // Zo hoef je niet alle data te herladen wanener niet nodig!
    });
  }





  // TASKS
  getTasks = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.list({
      'tasklist': taskListId,
      'maxResults': this.maxTaskListsResult
    }).then(this.updateTasks)
  }

  // getTasksZonderSubtasks = (taskListId:string) => {
  //   this.gapiRef.gapi.client.tasks.tasks.list({
  //     'tasklist': taskListId,
  //     'maxResults': this.maxTaskListsResult
  //   }).then(this.updateTasksZonderSubTasks)
  // }

  // getEnkelSubtasks = (taskListId:string, parentTaskId:string) => {
  //   console.log("taskListId: " + taskListId);
  //   console.log("parentTaskId: " + parentTaskId);
  //   this.gapiRef.gapi.client.tasks.tasks.list({
  //     'tasklist': taskListId,
  //     'maxResults': this.maxTaskListsResult
  //   }).then(this.updateEnkelSubTasks)
  // }

  getTask = (taskListId:string, taskId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.get({
      'tasklist': taskListId,
      'task': taskId
    }).then(this.updateTask)
  }

  newTask:any = (taskListId:string, naamTaak:string, ouder:string) => {
    this.gapiRef.gapi.client.tasks.tasks.insert({
      "tasklist": taskListId,
      "title": naamTaak,
      "parent": ouder
    }).then((response) => {
      this.getTasks(taskListId);
      // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
      // Zo hoef je niet alle data te herladen wanener niet nodig!
    });
  }

  changeStatusTask = (taskListId:string, taskId:string, isChecked:boolean) => {
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
      //this.clearCompletedTasks(taskListId);
      this.getTasks(taskListId);
      // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
      // Zo hoef je niet alle data te herladen wanener niet nodig!
    })
  }

  changeTitelTask = (taskListId:string, taskId:string, nieuweNaam:string, ouder:string) => {
    if(!(nieuweNaam == undefined || nieuweNaam == '')) {
      this.gapiRef.gapi.client.tasks.tasks.patch({
        'tasklist': taskListId,
        'task': taskId,
        'title': nieuweNaam,
        'parent': ouder
      }).then((response) => {
        //this.clearCompletedTasks(taskListId);
        this.getTasks(taskListId);
        this.getTask(taskListId, taskId);
        // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
        // Zo hoef je niet alle data te herladen wanener niet nodig!
      })
    }
  }

  clearCompletedTasks = (taskListId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.clear({
      'tasklist': taskListId
    }).then((response) => {
      this.getTasks(taskListId);
      // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
      // Zo hoef je niet alle data te herladen wanener niet nodig!
    })
  }

  deleteTask = (taskListId:string, taskId:string) => {
    this.gapiRef.gapi.client.tasks.tasks.delete({
      'tasklist': taskListId,
      'task': taskId
    }).then((response) => {
      this.getTasks(taskListId);
      // Kijken om bovenstaande aan te passeen: Zoeken in response naar return code 'status' als deze in 200 is, is dit gelukt.
      // Zo hoef je niet alle data te herladen wanener niet nodig!
    })
  }


  // UPDATES
  updateTaskLists = (response) => {
    this.taskListsSubject.next(response.result.items);
  }

  updateTaskList = (response) => {
    this.taskListSubject.next(response.result);
  }

  updateTasks = (response) => {
    this.tasksSubject.next(response.result.items);
    this.updateEnkelSubTasks(response);
    this.updateTasksZonderSubTasks(response);
  }

  updateTasksZonderSubTasks = (response) => {
    var tasksZonderSubTasks=[];
    if(response.result.items!=undefined) {
      for (let index = 0; index < response.result.items.length; index++) {
        const element = response.result.items[index];
        if(!element.parent) {
          tasksZonderSubTasks.push(element);
        }
      }
    } else {
      tasksZonderSubTasks=[];
    }
    this.tasksZonderSubtasksSubject.next(tasksZonderSubTasks)
  }

  updateEnkelSubTasks = (response) => {
    var enkelSubTasks=[];
    if(response.result.items!=undefined) {
      for (let index = 0; index < response.result.items.length; index++) {
        const element = response.result.items[index];
        if(element.parent) {
          enkelSubTasks.push(element);
        }
      }
    } else {
      enkelSubTasks=[];
    }
    this.enkelSubtasksSubject.next(enkelSubTasks)
  }

  updateTask = (response) => {
    this.taskSubject.next(response.result);
  }
}
