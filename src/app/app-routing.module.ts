import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { CalendarListsComponent } from './components/calendar-lists/calendar-lists.component';
import { WrapHomeComponent } from './components/wrap-home/wrap-home.component';


const routes: Routes = [
  { path: '', component: WrapHomeComponent },
  { path: 'calendar', component: CalendarListsComponent },
  { path: 'taskList/:taskListId', component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
