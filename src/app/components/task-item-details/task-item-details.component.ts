import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { GapiTaskService } from 'src/app/services/gapi-task.service';
import { GapiAuthenticateService } from 'src/app/services/gapi-authenticate.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-task-item-details',
  templateUrl: './task-item-details.component.html',
  styleUrls: ['./task-item-details.component.css']
})
export class TaskItemDetailsComponent implements OnInit {
  @Input() taskListId:string;
  @Input() taskId:string;
  @Input() taskName:string;
  @Output() annuleer = new EventEmitter();
  nieuweTaak:boolean = true;
  tasksZonderSubTasks=[];
  isSignedIn:boolean;

  titelWaarde:string = '';
  titelFormControl = new FormControl('', [
    Validators.required
  ]);
  titelErrorMatcher = new MyErrorStateMatcher();

   ouderWaarde:string = '';
  // ouderFormControl = new FormControl('', []);

  constructor(private gapiTaskService:GapiTaskService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) { }

  ngOnInit() {
    if(!(this.taskId == undefined || this.taskId == '' || this.taskName == undefined || this.taskName == '')) {
      this.titelWaarde=this.taskName;
      this.nieuweTaak=false;
    }

    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.gapiTaskService.tasksZonderSubtasksObservable.subscribe((tasks) => {
      this.ngZone.run(() => {
        this.aanpassenTasksZonderSubTasks(tasks);
      });
    });

    this.updateTasks();
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
    this.updateTasks();
  }

  aanpassenTasksZonderSubTasks = (tasks) => {
    this.tasksZonderSubTasks = tasks;
  }

  updateTasks = () => {
    if(this.isSignedIn) {
      if(!(this.taskListId == undefined || this.taskListId == '')) {
        this.laadTasks();
      }
    }
  }

  laadTasks = () => {
    this.gapiTaskService.getTasks(this.taskListId);
  }



  MaakNieuweTaakAan = (naamTaak:string, ouder:string) => {
    if(ouder==undefined) {
      ouder='';
    }
    this.gapiTaskService.newTask(this.taskListId, naamTaak, ouder);
    this.annuleer.emit();
  }

  PasGegevensTaakAan = (naamTaak:string, ouder:string) => {
    this.gapiTaskService.changeTitelTask(this.taskListId, this.taskId, naamTaak, ouder);
    this.annuleer.emit();
  }
}
