import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'My email',
    example: 'mukanovelnur168@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Username',
    example: 'elka',
  })
  readonly username: string;

  @ApiProperty({
    description: 'My biography',
    example: 'my name is Elnur and i backend developer...',
  })
  readonly bio: string;

  @ApiProperty({
    description: 'url img',
    example: 'some url',
  })
  readonly img: string;
}
