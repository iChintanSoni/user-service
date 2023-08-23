import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createResponse } from '@pilot/common/dist/response';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUser } from './dto/register-user.dto';

@Controller()
export class UserMicroController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return createResponse<User>({
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
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return createResponse<User[]>({
        statusCode: HttpStatus.OK,
        data: users,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string) {
    try {
      const user: User = await this.userService.findOne(id);
      return createResponse<User>({
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
      const user: User = await this.userService.update(updateUserDto);
      return createResponse<User>({
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
      return createResponse<User>({
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

  @EventPattern('registerUser')
  async registerUser(@Payload() registerUser: RegisterUser) {
    try {
      const registerUserResponse = await this.create({
        instituteBranchId: registerUser.branchId,
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        email: registerUser.email,
      });

      if (registerUserResponse.error) {
        throw registerUserResponse.error;
      }

      return createResponse({
        statusCode: HttpStatus.OK,
        data: registerUserResponse,
      });
    } catch (error) {
      return createResponse({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  // @EventPattern('addDummyStudents')
  // addDummyStudents(branchId: string) {
  //   return this.userService.addDummyUsers(branchId);
  // }
}
