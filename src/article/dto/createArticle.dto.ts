import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Title for the article',
    example: 'Nest js and typeOrm',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'Brief description of the article',
    example: 'In this article we will talk about NestJS and typeOrm',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    description: 'The main part of the article',
    example: 'much text about nestJs and typeOrm',
  })
  @IsNotEmpty()
  readonly body: string;

  readonly tagList?: string[];
}
