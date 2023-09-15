import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRestController } from './user.controller.rest';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_HOST, USER_SERVICE, USER_SERVICE_PORT } from 'src/config';
import { UserMicroController } from './user.controller.micro';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: APP_HOST,
          port: USER_SERVICE_PORT as unknown as number,
        },
      },
    ]),
  ],
  controllers: [UserRestController, UserMicroController],
  providers: [UserService],
})
export class UserModule {}
