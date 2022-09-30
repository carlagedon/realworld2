import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'elka',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'Email',
    example: 'mukanovelnur168@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password',
    example: 'QweRty_123',
  })
  @IsNotEmpty()
  readonly password: string;
}
