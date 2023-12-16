import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDtoUtil } from './dto/delete-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task | any>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task | any> {
    const task: Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.priority = createTaskDto.priority;
    task.createdBy = createTaskDto.createdBy;
    task.userEmail = createTaskDto.userEmail;
    task.dueDate = createTaskDto.dueDate;

    return await this.taskRepository.save(task);
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const id = updateTaskDto.id;
    const task = await this.taskRepository.findOne({ where: { id } });
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.priority = updateTaskDto.priority;
    task.userEmail = updateTaskDto.userEmail;
    task.dueDate = updateTaskDto.dueDate;

    return await this.taskRepository.save(task);
  }

  // findAll(id: number) {
  //   return `This action returns all tasks`;
  // }
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
  findOne(id: number): Promise<Task> {
    console.log('Id is ', id);
    return this.taskRepository.findOne({ where: { id } });
  }

  findOneEmail(email: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { userEmail: email } });
  }

  // async markStatusComplete(userIds: number[]): Promise<string> {
  //   await this.taskRepository.delete(userIds);
  //   return 'Users deleted successfully';
  // }
  async markStatusComplete(
    updateTaskDtoUtil: UpdateTaskDtoUtil,
  ): Promise<string> {
    const ids = updateTaskDtoUtil.ids;
    const updatedBy = updateTaskDtoUtil.updatedBy;
    await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({ completion: true, updatedBy: updatedBy })
      .whereInIds(ids)
      .execute();

    return 'status mark completed';
  }

  // async getTasksByUserEmail(email: string): Promise<Task[]> {
  //   return this.taskRepository.find({ where: { userEmail: email } });
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
