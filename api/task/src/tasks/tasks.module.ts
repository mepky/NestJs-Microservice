import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // This will make the User entity and UserRepository available within the current module
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
