import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { TaskPriority } from './task-priority.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  createdBy: string;

  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsOptional()
  userEmail: string;

  @IsOptional()
  @IsBoolean()
  completion: boolean;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsOptional()
  userEmail: string;

  @IsOptional()
  @IsBoolean()
  completion: boolean;
}
