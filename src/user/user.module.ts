import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRestController } from './user.controller.rest';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserRestController, UserRestController],
  providers: [UserService],
})
export class UserModule {}
