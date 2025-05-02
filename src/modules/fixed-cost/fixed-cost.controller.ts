import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FixedCostService } from './fixed-cost.service';
import { CreateFixedCostDto } from './dtos/createFixedCost.dto';

@ApiBearerAuth()
@ApiTags('FixedCost')
@Controller('fixed-cost')
export class FixedCostController {
  constructor(private readonly fixedCostService: FixedCostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new FixedCost and assign it to a User' })
  @ApiResponse({
    status: 201,
    description: 'The FixedCost has been successfully created.',
  })
  create(@Body() dto: CreateFixedCostDto, @Req() req) {
    return this.fixedCostService.createFixedCostForUser(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FixedCosts for a specific User' })
  @ApiResponse({
    status: 200,
    description: 'The list of FixedCosts for the User.',
  })
  async getFixedCosts(@Req() req) {
    return this.fixedCostService.getFixedCostsByUser(req.user.id);
  }
}
