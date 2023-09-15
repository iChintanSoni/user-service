import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = new RoleEntity();
    role.instituteBranchId = createRoleDto.instituteBranchId;
    role.name = createRoleDto.name;
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: string): Promise<RoleEntity | null> {
    return this.roleRepository.findOneBy({ id: id });
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const role: RoleEntity = await this.findOne(updateRoleDto.id);
    role.instituteBranchId = updateRoleDto.instituteBranchId;
    role.name = updateRoleDto.name;
    return this.roleRepository.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    if (role) {
      return this.roleRepository.remove(role);
    }
  }
}
