import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      const size = this.sizeRepository.create(createSizeDto);
      return await this.sizeRepository.save(size);
    } catch (error) {
      throw new InternalServerErrorException('Error creating size');
    }
  }

  async findAll() {
    try {
      return await this.sizeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching sizes');
    }
  }

  async findOne(id: number) {
    try {
      const size = await this.sizeRepository.findOne({ where: { id } });
      if (!size) {
        throw new NotFoundException('Size not found');
      }
      return size;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching size');
    }
  }

  async update(id: number, updateSizeDto: UpdateSizeDto) {
    try {
      const size = await this.findOne(id);
      Object.assign(size, updateSizeDto);
      return await this.sizeRepository.save(size);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating size');
    }
  }

  async remove(id: number) {
    try {
      const size = await this.findOne(id);
      return await this.sizeRepository.remove(size);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting size');
    }
  }
}
