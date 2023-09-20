import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@pilot/common/dist/model/user.model';

@Entity('User')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  instituteBranchId: string;

  @Column()
  roleId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;
}
