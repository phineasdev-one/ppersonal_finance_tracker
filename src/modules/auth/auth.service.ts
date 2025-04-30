import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthError } from './auth.error';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponseDto } from './dtos/login.dto';
import { UserError } from '../users/users.error';
import { RegisterDto } from './dtos/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserLoginResponseDto> {
    const payload = {
      fullName: user.fullName,
      id: user.id,
    };

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(payload: RegisterDto) {
    const existUser = await this.userRepository.findOne({
      where: [{ email: payload.email }],
    });

    if (existUser) {
      throw new HttpException(
        UserError.USER_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(payload.password, 10);

    const newCustomer = {
      password: hashPassword,
      fullName: payload.fullName,
      email: payload.email,
    };

    this.userRepository.save({
      ...newCustomer,
      password: hashPassword,
    });
  }

  async validateUser(email: string, incomePassword: string) {
    const userExisted = await this.usersService.getUserByEmail(email);

    console.log(userExisted);

    if (!userExisted) {
      throw new HttpException(AuthError.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const isValidPassword = await bcrypt.compare(
      incomePassword,
      userExisted.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        AuthError.INVALID_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password, ...result } = userExisted;

    return result;
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    return apiKey === process.env.API_KEY;
  }
}
