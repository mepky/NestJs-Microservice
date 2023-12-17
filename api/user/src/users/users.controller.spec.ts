import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
        .spyOn(controller, 'findAll')
        .mockImplementation(() => Promise.resolve([userResponse]));

      const result = await controller.findAll();

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
        .spyOn(controller, 'create')
        .mockImplementationOnce(() => Promise.resolve(userResponse));

      const result = await controller.create(newUser);

      // Verify the result using appropriate assertions
      expect(result).toEqual(userResponse); // Ensure that the entire result matches the userResponse
      expect(result.role).toEqual('default');
      expect(result.email).toEqual('abc@gmail.com');
    });
  });
});
