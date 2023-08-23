import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { RegisterUser } from './dto/register-user.dto';
import { UserAlreadyExists } from './user.service.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.instituteBranchId = createUserDto.instituteBranchId;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.roleId = randomUUID();
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async update(updateUserDto: UpdateUserDto) {
    const user: User = await this.findOne(updateUserDto.id);
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.instituteBranchId = updateUserDto.instituteBranchId;
    user.firstName = updateUserDto.firstName;
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return this.userRepository.remove(user);
    }
  }

  async register(registerUser: RegisterUser): Promise<User> {
    let user = await this.userRepository.findOne({
      where: {
        email: registerUser.email,
        instituteBranchId: registerUser.branchId,
      },
    });
    if (user) {
      throw new UserAlreadyExists(
        `User with email: ${user.email} already exists for this institute. Please try another email.`,
      );
    }
    user = new User();
    user.instituteBranchId = registerUser.branchId;
    user.firstName = registerUser.firstName;
    user.lastName = registerUser.lastName;
    user.email = registerUser.email;
    user.userName = registerUser.email.split('@')[0];
    user.password = `${registerUser.email.split('@')[0]}@123`;
    return this.userRepository.save(user);
  }

  // private addDummyStudents() {
  //   fetch('https://randomuser.me/api/?results=5000');
  // }

  // private addDummyTeachers() {}
}
