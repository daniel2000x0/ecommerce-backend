import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createColorDto: CreateColorDto) {
    try {
      const color = this.colorRepository.create(createColorDto);
      return await this.colorRepository.save(color);
    } catch (error) {
      throw new InternalServerErrorException('Error creating color');
    }
  }

  async findAll() {
    try {
      return await this.colorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching colors');
    }
  }

  async findOne(id: number) {
    try {
      const color = await this.colorRepository.findOne({ where: { id } });
      if (!color) {
        throw new NotFoundException('Color not found');
      }
      return color;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching color');
    }
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    try {
      const color = await this.findOne(id);
      Object.assign(color, updateColorDto);
      return await this.colorRepository.save(color);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating color');
    }
  }

  async remove(id: number) {
    try {
      const color = await this.findOne(id);
      return await this.colorRepository.remove(color);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting color');
    }
  }
}
