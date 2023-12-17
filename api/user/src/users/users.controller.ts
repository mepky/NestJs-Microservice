import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { DeleteUsersDto } from './dto/delete-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('create')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @EventPattern('user_created')
  @MessagePattern('user_created')
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get('all')
  // findAll() {
  //   return this.usersService.findAll();
  // }
  // @EventPattern('get-all-users')
  @MessagePattern('get-all-users')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('create-default-user')
  createDefaultUser() {
    return this.usersService.createDefaultUser();
  }

  @MessagePattern('get-user-by-mail')
  findUserBymail(email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @MessagePattern('get-user-by-email')
  findUserByEmail(email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @MessagePattern('get-user-by-id')
  findOne(id: number) {
    return this.usersService.findOne(+id);
  }
  // @Post('deleteByIds')
  @MessagePattern('deleteByIds')
  deleteUsersByIds(@Body() deleteUsersDto: DeleteUsersDto) {
    return this.usersService.deleteUsersByIds(deleteUsersDto.ids);
  }

  @MessagePattern('delete-user-by-id')
  remove(id: number) {
    return this.usersService.remove(id);
  }

  @Get('Hello')
  getHello(): string {
    return this.usersService.getHello();
  }
}
