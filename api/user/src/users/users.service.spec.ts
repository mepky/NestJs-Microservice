import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { CreateUserDto } from 'src/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return an Hello', () => {
      jest.spyOn(service, 'getHello').mockImplementation(() => 'Hello');
      expect(service.getHello()).toBe('Hello');
    });
  });

  describe('findAll', () => {
    const userResponse = {
      id: 26,
      username: 'praveen1',
      email: 'abc@gmail.com',
      role: 'default',
      createdBy: 'test@gmail.com',
      createdAt: new Date(),
    };
    it('should return an array of users', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve([userResponse]));

      const result = await service.findAll();

      expect(result).toEqual([userResponse]);
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const newUser = {
        username: 'praveen1',
        email: 'abc@gmail.com',
        role: 'default',
        createdBy: 'test@gmail.com',
      };

      const userResponse = {
        id: 26,
        username: 'praveen1',
        email: 'abc@gmail.com',
        role: 'default',
        createdBy: 'test@gmail.com',
        createdAt: new Date(),
      };

      // Mock the create method of the service to return the userResponse
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() => Promise.resolve(userResponse));

      const result = await service.create(newUser);

      // Verify the result using appropriate assertions
      expect(result).toEqual(userResponse); // Ensure that the entire result matches the userResponse
      expect(result.role).toEqual('default');
      expect(result.email).toEqual('abc@gmail.com');
    });
  });
});
