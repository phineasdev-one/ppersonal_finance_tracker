import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail({}, { message: 'INVALID_EMAIL' })
  @Type(() => String)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  fullName: string;
}
