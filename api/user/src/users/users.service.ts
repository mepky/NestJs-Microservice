import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User | any>,
  ) {}

  getHello(): string {
    return 'Hello';
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email.toLowerCase() },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
      // return {"Email already exists !"};
    }
    const user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email.toLowerCase();
    user.role = createUserDto.role;
    user.createdBy = createUserDto.createdBy;

    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createDefaultUser(): Promise<User> {
    const user: User = new User();
    user.username = 'Test';
    user.email = 'test@gmail.com';
    user.role = 'admin';
    user.createdBy = 'self';

    return await this.userRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUsersByIds(userIds: number[]): Promise<string> {
    await this.userRepository.delete(userIds);
    return 'Users deleted successfully';
  }
  findUserByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { email } });
    return user || null;
  }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
