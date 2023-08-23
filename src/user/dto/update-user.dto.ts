import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(User) {
  id: string;
  instituteBranchId: string;
  firstName: string;
  lastName: string;
  email: string;
}
