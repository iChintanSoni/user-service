import { PartialType } from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';

export class UpdateRoleDto extends PartialType(RoleEntity) {
  id: string;
  instituteBranchId: string;
  name: string;
}
