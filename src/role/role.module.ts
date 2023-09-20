import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller.rest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ROLE_SERVICE, APP_HOST, ROLE_SERVICE_PORT } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    ClientsModule.register([
      {
        name: ROLE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: APP_HOST,
          port: ROLE_SERVICE_PORT as unknown as number,
        },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
