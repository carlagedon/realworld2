import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/user-login.dto';
import { User } from './decoraters/user.decorater';
import UserEntity from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<userResponseInterface> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<userResponseInterface> {
    console.log('loginDto', loginDto);
    const user = await this.userService.login(loginDto);
    console.log(user);

    return this.userService.buildUserResponse(user);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity,
    @User('id') currentUserId: number,
  ): Promise<userResponseInterface> {
    console.log('userID', currentUserId);
    return this.userService.buildUserResponse(user);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<userResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
