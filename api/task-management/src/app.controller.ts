import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { CreateUserDto } from './create-user-request.dto';
import { CreateUserDto } from './create-user.dto';
import { CreateTaskDto, UpdateTaskDto } from './create-task.dto';
import { DeleteUsersDto } from './users/dto/delete-user.dto';
import { UpdateTaskStatusDto } from './users/dto/update-task.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Post('delete/user')
  async deleteUsersByIds(@Body() deleteUserDto: DeleteUsersDto) {
    return this.appService.deleteUsersByIds(deleteUserDto);
  }
  @Get('create/default/user')
  defaultUser() {
    return this.appService.createDefaultUser();
  }

  @Get('user/all')
  findAll() {
    return this.appService.findAll();
  }

  @Get('login')
  findUserBymail(@Query('email') email: string) {
    return this.appService.loginByEmail(email);
  }

  @Get('currentUser')
  findUserByEmail(@Query('email') email: string) {
    return this.appService.findUserByEmail(email);
  }

  @Get('user/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }

  @Delete('user/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id);
  }

  // Task controller

  @Post('task/create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.appService.createTask(createTaskDto);
  }

  @Post('task/update')
  updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    return this.appService.updateTask(updateTaskDto);
  }

  @Post('task/status')
  async markStatusComplete(@Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.appService.markStatusComplete(updateTaskStatusDto);
  }

  @Get('task/all')
  getAllTask() {
    return this.appService.getAllTask();
  }

  @Get('task/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getTaskById(id);
  }

  @Get('task/by/:email')
  @UsePipes(new ValidationPipe({ transform: true }))
  getTaskByUserEmail(@Param('email') email: string) {
    return this.appService.getTaskByUserEmail(email);
  }
}
