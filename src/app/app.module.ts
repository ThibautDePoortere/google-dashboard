import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { TaskListsComponent } from './components/task-lists/task-lists.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

import { TaskListItemDetailsComponent } from './components/task-list-item-details/task-list-item-details.component';
import { GoToHomeComponent } from './components/go-to-home/go-to-home.component';
import { TaskItemDetailsComponent } from './components/task-item-details/task-item-details.component';
import { CalendarListsComponent } from './components/calendar-lists/calendar-lists.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    TaskListsComponent,
    TasksComponent,
    TaskListItemComponent,
    TaskItemComponent,
    TaskListItemDetailsComponent,
    GoToHomeComponent,
    TaskItemDetailsComponent,
    CalendarListsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
