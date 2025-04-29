import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @Inject('USER_REPOSITORY')
  private userRepository: Repository<User>;

  async findOne(conditions: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(conditions);
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
