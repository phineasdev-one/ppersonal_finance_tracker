import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FixedCost } from './entities/fixedCost.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateFixedCostDto } from './dtos/createFixedCost.dto';

@Injectable()
export class FixedCostService {
  constructor(
    @InjectRepository(FixedCost)
    private readonly fixedCostRepository: Repository<FixedCost>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createFixedCostForUser(
    dto: CreateFixedCostDto,
    userId: string,
  ): Promise<FixedCost> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const fixedCost = this.fixedCostRepository.create(dto);
    fixedCost.users = [user];

    return await this.fixedCostRepository.save(fixedCost);
  }

  async getFixedCostsByUser(userId: string): Promise<FixedCost[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['fixedCosts'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.fixedCosts;
  }
}
