import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrivateRoute } from '../auth/auth.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@ApiBearerAuth()
@PrivateRoute()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, description: 'Category created' })
  create(@Body() dto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of categories by user' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  findAll(@Req() req) {
    return this.categoryService.findAll(req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update name category' })
  @ApiResponse({ status: 200, description: 'Category updated' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
