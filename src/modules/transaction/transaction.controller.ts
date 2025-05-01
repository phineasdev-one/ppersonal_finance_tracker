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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PrivateRoute } from '../auth/auth.decorator';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dtos/createTransaction.dto';
import { UpdateTransactionDto } from './dtos/updateTransaction.dto';

@ApiTags('Transaction')
@ApiBearerAuth()
@PrivateRoute()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction (IN/OUT)' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transaction by month and year' })
  @ApiQuery({ name: 'month', required: true })
  @ApiQuery({ name: 'year', required: true })
  findAll(
    @Query('month') month: number,
    @Query('year') year: number,
    @Req() req,
  ) {
    return this.transactionService.findAllByMonthYear(
      req.user.id,
      +month,
      +year,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction detail' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction' })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
