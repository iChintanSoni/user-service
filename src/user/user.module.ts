import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRestController } from './user.controller.rest';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_HOST, USER_SERVICE, USER_SERVICE_PORT } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  controllers: [UserRestController, UserRestController],
  providers: [UserService],
})
export class UserModule {}
