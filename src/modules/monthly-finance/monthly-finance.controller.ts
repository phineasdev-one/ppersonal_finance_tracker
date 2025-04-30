import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { MonthlyFinanceService } from './monthly-finance.service';
import { CreateMonthlyFinanceDto } from './dtos/createMonthly.dto';
import { PrivateRoute } from '../auth/auth.decorator';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdateMonthlyFinanceDto } from './dtos/update-monthly-finance.dto';

@ApiBearerAuth()
@Controller('monthly-finance')
export class MonthlyFinanceController {
  constructor(private readonly monthlyFinanceService: MonthlyFinanceService) {}

  @PrivateRoute()
  @Post()
  @ApiBody({ type: CreateMonthlyFinanceDto })
  async create(
    @Body() payload: Omit<CreateMonthlyFinanceDto, 'userId'>,
    @Req() req,
  ) {
    return this.monthlyFinanceService.createMonthlyFinance(
      payload,
      req.user.id,
    );
  }

  @Get()
  @PrivateRoute()
  @ApiQuery({ name: 'month', type: Number })
  @ApiQuery({ name: 'year', type: Number })
  async getMonthlyFinance(
    @Query('month') month: number,
    @Query('year') year: number,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.monthlyFinanceService.getMonthlyFinance(userId, month, year);
  }

  @Get(':id')
  @PrivateRoute()
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.monthlyFinanceService.findOne(id, userId);
  }

  @Patch(':id')
  @PrivateRoute()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMonthlyFinanceDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.monthlyFinanceService.update(id, dto, userId);
  }

  @Delete(':id')
  @PrivateRoute()
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.monthlyFinanceService.remove(id, userId);
  }
}
