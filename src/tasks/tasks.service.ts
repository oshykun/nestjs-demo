import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { v1 as uuidV1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id = id);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidV1(),
      title,
      description,
      status: TasksStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    const idx = this.tasks.findIndex(task => task.id = id);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
    }
  }

  updateTaskStatus(id: string, status: TasksStatus): Task {
    const taskToUpdate = this.getTaskById(id);

    if (!taskToUpdate) {
      throw new Error('Task was not found!');
    }
    taskToUpdate.status = status;

    return taskToUpdate;
  }
}
