import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@pilot/common/dist/model/role.model';

@Entity('Role')
export class RoleEntity implements Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  instituteBranchId: string;

  @Column()
  name: string;
}
