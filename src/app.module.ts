import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from './config';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: DATABASE_PORT as unknown as number,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [User, Role],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
