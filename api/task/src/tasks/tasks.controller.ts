import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDtoUtil } from './dto/delete-task.dto';

import { DeleteTaskDto } from './dto/delete-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.create(createTaskDto);
  // }

  @MessagePattern('task_created')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('task_updated')
  updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(updateTaskDto);
  }

  // @MessagePattern('get-all-users')
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @MessagePattern('get-all-tasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern('get-task-by-id')
  findOne(id: string) {
    return this.tasksService.findOne(+id);
  }

  @MessagePattern('get-task-by-email')
  findOneEmail(email: string) {
    return this.tasksService.findOneEmail(email);
  }

  @MessagePattern('markStatusComplete')
  markStatusComplete(updateTaskDtoUtil: UpdateTaskDtoUtil) {
    return this.tasksService.markStatusComplete(updateTaskDtoUtil);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
