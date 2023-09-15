import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createResponse } from '@pilot/common/dist/response';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUser } from './dto/register-user.dto';

@Controller()
export class UserMicroController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return createResponse<UserEntity>({
        statusCode: HttpStatus.OK,
        data: user,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('findAllUser')
  async findAll(@Payload() nothing: undefined) {
    try {
      const users = await this.userService.findAll();
      return createResponse<UserEntity[]>({
        statusCode: HttpStatus.OK,
        data: users,
      });
    } catch (error) {
      console.error(error);
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string) {
    try {
      const user: UserEntity = await this.userService.findOne(id);
      return createResponse<UserEntity>({
        statusCode: HttpStatus.OK,
        data: user,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('updateUser')
  async update(@Payload() updateUserDto: UpdateUserDto) {
    try {
      const user: UserEntity = await this.userService.update(updateUserDto);
      return createResponse<UserEntity>({
        statusCode: HttpStatus.OK,
        data: user,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: string) {
    try {
      const user = await this.userService.remove(id);
      return createResponse<UserEntity>({
        statusCode: HttpStatus.OK,
        data: user,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('registerUser')
  async registerUser(@Payload() registerUser: RegisterUser) {
    try {
      const user = await this.userService.register(registerUser);
      return createResponse({
        statusCode: HttpStatus.OK,
        data: user,
      });
    } catch (error) {
      return createResponse({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }
}
