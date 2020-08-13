import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TasksStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TasksStatus.OPEN,
    TasksStatus.IN_PROGRESS,
    TasksStatus.DONE,
  ];

  transform(value: any): any {
    const statusVal = value.toUpperCase();
    if (!this.isStatusValid(statusVal)) {
      throw new BadRequestException(`"${statusVal}" is an invalid status.`);
    }
    return statusVal;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx != -1;
  }
}
