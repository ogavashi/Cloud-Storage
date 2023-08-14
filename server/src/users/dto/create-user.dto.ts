import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @ApiProperty()
  fullName: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ApiProperty()
  password: string;
}
