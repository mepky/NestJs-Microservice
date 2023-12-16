import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();

  // }

  // @EventPattern('user_created')
  // handleUserCreated(data: CreateUserEvent) {
  //   this.appService.handleUserCreated(data);
  // }

  // @EventPattern('user_created')
  // create(data: CreateUserEvent) {
  //   return this.usersService.create(data);
  // }
}
