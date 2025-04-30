import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginDto, UserLoginResponseDto } from './dtos/login.dto';
import { LogoutQueryDto } from './dtos/logout.dto';
import { RegisterDto } from './dtos/register.dto';
import { PrivateRoute } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: UserLoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async login(@Request() req): Promise<UserLoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @ApiOperation({ summary: 'User register a new account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The account has been successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async register(@Body() payload: RegisterDto): Promise<void> {
    return this.authService.register(payload);
  }
}
