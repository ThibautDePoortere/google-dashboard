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
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { TaskListsComponent } from './components/task-lists/task-lists.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

import { TaskListItemDetailsComponent } from './components/task-list-item-details/task-list-item-details.component';
import { TaskItemDetailsComponent } from './components/task-item-details/task-item-details.component';
import { CalendarListsComponent } from './components/calendar-lists/calendar-lists.component';
import { CalendarWrapComponent } from './components/calendar-wrap/calendar-wrap.component';
import { HeaderComponent } from './components/header/header.component';
import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';
import { CalendarEventItemComponent } from './components/calendar-event-item/calendar-event-item.component';
import { CalendarEventItemDetailsComponent } from './components/calendar-event-item-details/calendar-event-item-details.component';
import { WrapHomeComponent } from './components/wrap-home/wrap-home.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    TaskListsComponent,
    TasksComponent,
    TaskListItemComponent,
    TaskItemComponent,
    TaskListItemDetailsComponent,
    TaskItemDetailsComponent,
    CalendarListsComponent,
    CalendarWrapComponent,
    HeaderComponent,
    CalendarEventsComponent,
    CalendarEventItemComponent,
    CalendarEventItemDetailsComponent,
    WrapHomeComponent,
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
    MatRadioModule,
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
