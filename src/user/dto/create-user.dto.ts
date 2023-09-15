import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends PartialType(UserEntity) {
  instituteBranchId: string;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}
