import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../shared/services/tasks.service';
import {DateService} from '../shared/services/date.servise';
import {switchMap} from 'rxjs/operators';

import { visibility } from '../shared/app.animations';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  animations: [visibility()],
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];
  visibility = 'shown';

  constructor(public dateService: DateService,
              private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => {
        this.visibility = 'hidden';
        return this.tasksService.load(value);
      }
      )
    ).subscribe(tasks => {
      this.tasks = tasks;
      this.visibility = 'shown';
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err));
  }

  remove(task: Task): void {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, err => console.error(err));
  }

  toggleComplete(task: Task) {
    this.tasksService
      .update({
        ...task,
        isDone: !task.isDone,
      })
      .subscribe(() => {
        this.tasks.filter(t => t.id === task.id).pop().isDone = !task.isDone;
      });
  }
}
