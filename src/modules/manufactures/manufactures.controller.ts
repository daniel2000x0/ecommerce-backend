import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturesService } from './manufactures.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';

@Controller('manufactures')
export class ManufacturesController {
  constructor(private readonly manufacturesService: ManufacturesService) {}

  @Post()
  create(@Body() createManufactureDto: CreateManufactureDto) {
    return this.manufacturesService.create(createManufactureDto);
  }

  @Get()
  findAll() {
    return this.manufacturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufactureDto: UpdateManufactureDto) {
    return this.manufacturesService.update(+id, updateManufactureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturesService.remove(+id);
  }
}
