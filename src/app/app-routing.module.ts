import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { TaskListsComponent } from './components/task-lists/task-lists.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CalendarListsComponent } from './components/calendar-lists/calendar-lists.component';


const routes: Routes = [
  { path: '', component: TaskListsComponent },
  { path: 'calendar', component: CalendarListsComponent },
  { path: 'taskList/:taskListId', component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
