import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUser } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserAlreadyExists } from './user.service.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async register(registerUser: RegisterUser) {
    let user = await this.userRepository.findOne({
      where: {
        email: registerUser.email,
        instituteId: registerUser.instituteId,
      },
    });
    if (user) {
      throw new UserAlreadyExists(
        `User with email: ${user.email} already exists for this institute. Please try another email.`,
      );
    }
    user = new User();
    user.instituteId = registerUser.instituteId;
    user.firstName = registerUser.firstName;
    user.lastName = registerUser.lastName;
    user.email = registerUser.email;
    user.userName = registerUser.email.split('@')[0];
    user.userName = `${registerUser.email.split('@')[0]}@123`;
    return this.userRepository.create(user);
  }

  addDummyUsers(instituteId: string) {}

  private addDummyStudents() {
    fetch('https://randomuser.me/api/?results=5000');
  }

  private addDummyTeachers() {}
}
