import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
// import { UserRole } from './user-role.enum'; // Assuming UserRole is an enum defining user roles

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  createdBy: string; // createdBy can be optional
}
