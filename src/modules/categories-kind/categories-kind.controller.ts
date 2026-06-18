import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesKindService } from './categories-kind.service';
import { CreateCategoriesKindDto } from './dto/create-categories-kind.dto';
import { UpdateCategoriesKindDto } from './dto/update-categories-kind.dto';

@Controller('categories-kind')
export class CategoriesKindController {
  constructor(private readonly categoriesKindService: CategoriesKindService) {}

  @Post()
  create(@Body() createCategoriesKindDto: CreateCategoriesKindDto) {
    return this.categoriesKindService.create(createCategoriesKindDto);
  }

  @Get()
  findAll() {
    return this.categoriesKindService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesKindService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesKindDto: UpdateCategoriesKindDto) {
    return this.categoriesKindService.update(+id, updateCategoriesKindDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesKindService.remove(+id);
  }
}
