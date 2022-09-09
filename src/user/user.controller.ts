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
  @UseGuards(AuthGuard)
  async updateCurentUser(
    @User('id') currentUserID: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<userResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserID,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
function currentUser(arg0: string, currentUser: any) {
  throw new Error('Function not implemented.');
}
