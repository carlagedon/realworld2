import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/user-login.dto';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<userResponseInterface> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user)
    
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
  ): Promise<userResponseInterface> {
    console.log('loginDto', loginDto);
    const user = await this.userService.login(loginDto);
    console.log(user);
    
    return this.userService.buildUserResponse(user);
  }

  @Get()
  async currentUser(@Req() request: ExpressRequestInterface): Promise<userResponseInterface> {    
    console.log(request.user)
    return this.userService.buildUserResponse(request.user)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
