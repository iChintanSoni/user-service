import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../entities/role.entity';

export class CreateRoleDto extends PartialType(Role) {
  instituteBranchId: string;
  name: string;
}
