import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';

// describe('UsersController', () => {
//   let controller: UsersController;
//   let usersService: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         {
//           provide: UsersService,
//           useValue: {
//             create: jest.fn(),
//             findAll: jest.fn(),
//             findUserByEmail: jest.fn(),
//             findOne: jest.fn(),
//             remove: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//     usersService = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should create a user', () => {
//     const createUserDto: CreateUserDto = { /* provide test data for createUserDto */ };
//     controller.create(createUserDto);
//     expect(usersService.create).toHaveBeenCalledWith(createUserDto);
//   });

//   it('should find all users', () => {
//     controller.findAll();
//     expect(usersService.findAll).toHaveBeenCalled();
//   });

//   it('should find user by email for login', () => {
//     const email = 'test@example.com';
//     controller.findUserBymail({ email });
//     expect(usersService.findUserByEmail).toHaveBeenCalledWith(email);
//   });

//   it('should find user by email for current user', () => {
//     const email = 'test@example.com';
//     controller.findUserByEmail({ email });
//     expect(usersService.findUserByEmail).toHaveBeenCalledWith(email);
//   });

//   it('should find a user by id', () => {
//     const id = 1;
//     controller.findOne({ id });
//     expect(usersService.findOne).toHaveBeenCalledWith(id);
//   });

//   it('should remove a user by id', () => {
//     const id = 1;
//     controller.remove({ id });
//     expect(usersService.remove).toHaveBeenCalledWith(id);
//   });
// });
