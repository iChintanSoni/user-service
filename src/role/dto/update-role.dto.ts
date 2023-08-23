import { PartialType } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';

export class UpdateRoleDto extends PartialType(Role) {
  id: string;
  instituteBranchId: string;
  name: string;
}
