import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This will make the User entity and UserRepository available within the current module
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
