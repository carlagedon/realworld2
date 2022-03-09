import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECREET } from 'src/config';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import { userResponseInterface } from './types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return this.userRepository.save(newUser);
  }

  genereteJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email,

    },
    JWT_SECREET);
  }


  buildUserResponse(user: UserEntity): userResponseInterface {
    return {
      user: {
        ...user,
        token: this.genereteJwt(user)
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }
 
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
