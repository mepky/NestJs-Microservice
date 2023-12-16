import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';
// import { CreateUserEvent } from './create-user.event';
import { CreateTaskDto, UpdateTaskDto } from './create-task.dto';
import { DeleteUsersDto } from './users/dto/delete-user.dto';
import { UpdateTaskStatusDto } from './users/dto/update-task.dto';
// import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

import { User } from './users/entities/user.entity';
// import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  // private readonly users: any[] = [];

  constructor(
    @Inject('USERS') private readonly userClient: ClientProxy,
    @Inject('TASKS') private readonly taskClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserDto: CreateUserDto) {
    // return this.userClient.send('user_created', createUserDto);
    const createdBy = createUserDto.createdBy;

    this.userClient
      .send('get-user-by-email', createdBy)
      .pipe(
        switchMap((user: User) => {
          if (user.role === 'admin') {
            return this.userClient.send('user_created', createUserDto);
          } else {
            return throwError(new Error('User is not an admin'));
          }
        }),
      )
      .subscribe(
        () => {
          // Handle success if needed
        },
        (error) => {
          // Return error to the client
          // For example, if you are using NestJS, you can use the @nestjs/common package to throw an exception
          throw new ForbiddenException('User is not an admin');
        },
      );
  }

  deleteUsersByIds(deleteUsersDto: DeleteUsersDto) {
    // this.users.push(createUserDto);
    return this.userClient.send('deleteByIds', deleteUsersDto);
    // this.taskClient.send(
    //   'user_created',
    //   new CreateUserEvent(createUserDto.email),
    // );
  }

  findAll() {
    return this.userClient.send('get-all-users', {});
  }
  createDefaultUser() {
    return this.userClient.send('create-default-user', {});
  }

  findOne1(id: number) {
    return this.userClient.send('get-user-by-id', id);
  }

  findOne(id: number) {
    return this.userClient.send('get-user-by-id', id).pipe(
      switchMap((user: User) => {
        if (user.role === 'admin') {
          return this.userClient.send('get-all-users', {});
        } else {
          return of([user]); // Assuming user client already fetches the user by id, returning the user directly
        }
      }),
    );
  }

  loginByEmail(email: string) {
    return this.userClient.send('get-user-by-email', email).pipe(
      switchMap((user: User) => {
        if (!user) {
          return throwError(new Error('User not found')); // Throw error if user doesn't exist
        }
        return of(user); // Assuming user client already fetches the user by email, returning the user directly
      }),
      catchError((error) => {
        return throwError(new Error('Error finding the user')); // Handle any error from the userClient
      }),
    );
  }

  findUserByEmail(email: string) {
    return this.userClient.send('get-user-by-email', email).pipe(
      switchMap((user: User) => {
        if (!user) {
          return throwError(new Error('User not found')); // Throw error if user doesn't exist
        }
        if (user.role === 'admin') {
          return this.userClient.send('get-all-users', {});
        } else {
          return of([user]); // Assuming user client already fetches the user by email, returning the user directly
        }
      }),
      catchError((error) => {
        return throwError(new Error('Error finding the user')); // Handle any error from the userClient
      }),
    );
  }

  remove(id: number) {
    return this.userClient.send('delete-user-by-id', id);
  }

  ////////////Task services //////////

  createTask(createTaskDto: CreateTaskDto) {
    const createdBy = createTaskDto.createdBy;

    this.userClient
      .send('get-user-by-email', createdBy)
      .pipe(
        switchMap((user: User) => {
          console.log('user ', user);
          if (user.role === 'admin') {
            return this.taskClient.send('task_created', createTaskDto);
          } else {
            return throwError(new Error('User is not an admin'));
          }
        }),
      )
      .subscribe(
        () => {
          // Handle success if needed
        },
        (error) => {
          // Return error to the client
          // For example, if you are using NestJS, you can use the @nestjs/common package to throw an exception
          throw new ForbiddenException('User is not an admin');
        },
      );
  }

  updateTask(updateTaskDto: UpdateTaskDto) {
    // this.users.push(createUserDto);
    return this.taskClient.send('task_updated', updateTaskDto);
  }

  markStatusComplete(updateTaskStatusDto: UpdateTaskStatusDto) {
    // this.users.push(createUserDto);
    return this.taskClient.send('markStatusComplete', updateTaskStatusDto);
  }

  getTaskById(id: number) {
    return this.taskClient.send('get-task-by-id', id);
  }

  getTaskByUserEmail(email: string) {
    return this.taskClient.send('get-task-by-email', email);
  }

  getAllTask() {
    return this.taskClient.send('get-all-tasks', {});
  }
}
