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
  selector: 'app-task-list-item-details',
  templateUrl: './task-list-item-details.component.html',
  styleUrls: ['./task-list-item-details.component.css']
})
export class TaskListItemDetailsComponent implements OnInit {
  @Input() taskListId:string;
  @Input() taskListName:string;
  @Output() annuleer = new EventEmitter();
  nieuweLijst:boolean = true;
  isSignedIn:boolean;

  titelWaarde:string = '';
  titelFormControl = new FormControl('', [
    Validators.required
  ]);
  titelErrorMatcher = new MyErrorStateMatcher();

  constructor(private gapiTaskService:GapiTaskService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) { }

  ngOnInit() {
    if(!(this.taskListId == undefined || this.taskListId == '' || this.taskListName == undefined || this.taskListName == '')) {
      this.titelWaarde=this.taskListName;
      this.nieuweLijst=false;
    }

    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });

    this.updateTaskLists();
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
    this.updateTaskLists();
  }

  updateTaskLists = () => {
    if(this.isSignedIn) {
      this.laadTaskLists();
    }
  }

  laadTaskLists = () => {
    this.gapiTaskService.getTaskLists();
  }



  MaakNieuweLijstAan = (naamLijst:string) => {
    this.gapiTaskService.newTaskList(naamLijst);
    this.annuleer.emit();
  }

  PasGegevensLijstAan = (naamLijst:string) => {
    this.gapiTaskService.changeTitelTaskList(this.taskListId, naamLijst);
    this.annuleer.emit();
  }

}
