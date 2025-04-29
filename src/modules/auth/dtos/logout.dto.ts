import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LogoutQueryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  deviceToken: string;
}
