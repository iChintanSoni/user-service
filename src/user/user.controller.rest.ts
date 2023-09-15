import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import {
  createResponse,
  respondWith,
  sendToClient,
} from '@pilot/common/dist/response';
import { Response } from 'express';

@ApiTags('users')
@Controller('user')
export class UserRestController {
  constructor(@Inject(USER_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const responseWrapper = await sendToClient({
        client: this.client,
        event: 'createUser',
        payload: createUserDto,
      });
      respondWith(response, responseWrapper);
    } catch (error) {
      respondWith(
        response,
        createResponse({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          error: error,
        }),
      );
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const responseWrapper = await sendToClient({
        client: this.client,
        event: 'findAllUser',
        payload: undefined,
      });
      respondWith(response, responseWrapper);
    } catch (error) {
      console.error(error);
      respondWith(
        response,
        createResponse({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          error: error,
        }),
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const responseWrapper = await sendToClient({
        client: this.client,
        event: 'findOneUser',
        payload: id,
      });
      respondWith(response, responseWrapper);
    } catch (error) {
      respondWith(
        response,
        createResponse({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          error: error,
        }),
      );
    }
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      const responseWrapper = await sendToClient({
        client: this.client,
        event: 'updateUser',
        payload: updateUserDto,
      });
      respondWith(response, responseWrapper);
    } catch (error) {
      respondWith(
        response,
        createResponse({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          error: error,
        }),
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const responseWrapper = await sendToClient({
        client: this.client,
        event: 'removeUser',
        payload: id,
      });
      respondWith(response, responseWrapper);
    } catch (error) {
      respondWith(
        response,
        createResponse({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          error: error,
        }),
      );
    }
  }
}
