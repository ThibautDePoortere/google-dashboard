import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItemDetailsComponent } from './task-list-item-details.component';

describe('TaskListItemDetailsComponent', () => {
  let component: TaskListItemDetailsComponent;
  let fixture: ComponentFixture<TaskListItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
