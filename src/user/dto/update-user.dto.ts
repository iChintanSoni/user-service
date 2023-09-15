import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(UserEntity) {
  id: string;
  instituteBranchId: string;
  firstName: string;
  lastName: string;
  email: string;
}
