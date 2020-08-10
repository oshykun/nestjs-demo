import { TasksStatus } from '../task.model';

export class GetTaskFilterDto {
  status: TasksStatus;
  search: string;
}
