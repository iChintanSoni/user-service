import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { createResponse } from '@pilot/common/dist/response';
import { Role } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RoleMicroController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern('createRole')
  async create(@Payload() createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleService.create(createRoleDto);
      return createResponse<Role>({
        statusCode: HttpStatus.OK,
        data: role,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('findAllRole')
  async findAll() {
    try {
      const roles = await this.roleService.findAll();
      return createResponse<Role[]>({
        statusCode: HttpStatus.OK,
        data: roles,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('findOneRole')
  async findOne(@Payload() id: string) {
    try {
      const role: Role = await this.roleService.findOne(id);
      return createResponse<Role>({
        statusCode: HttpStatus.OK,
        data: role,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('updateRole')
  async update(@Payload() updateRoleDto: UpdateRoleDto) {
    try {
      const role: Role = await this.roleService.update(updateRoleDto);
      return createResponse<Role>({
        statusCode: HttpStatus.OK,
        data: role,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  @MessagePattern('removeRole')
  async remove(@Payload() id: string) {
    try {
      const role = await this.roleService.remove(id);
      return createResponse<Role>({
        statusCode: HttpStatus.OK,
        data: role,
      });
    } catch (error) {
      return createResponse<void>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error,
      });
    }
  }

  // @EventPattern('addDummyStudents')
  // addDummyStudents(branchId: string) {
  //   return this.userService.addDummyUsers(branchId);
  // }
}
