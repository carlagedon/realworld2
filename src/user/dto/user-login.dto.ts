import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'email',
    example: 'mukanovelnur168@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'password',
    example: 'QweRty_123',
  })
  @IsNotEmpty()
  readonly password: string;
}
