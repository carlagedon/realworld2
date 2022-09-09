import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/decoraters/user.decorater';
import UserEntity from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiTags('Article')
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<any> {
    return this.articleService.createArticle(currentUser, createArticleDto);
  }
}
