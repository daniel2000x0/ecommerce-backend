import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriesKindDto } from './dto/create-categories-kind.dto';
import { UpdateCategoriesKindDto } from './dto/update-categories-kind.dto';

@Injectable()
export class CategoriesKindService {
  constructor(
    @InjectRepository(CategoriesKind)
    private readonly categoriesKindRepository: Repository<CategoriesKind>,
  ) {}

  async create(createCategoriesKindDto: CreateCategoriesKindDto) {
    try {
      const categoriesKind = this.categoriesKindRepository.create(createCategoriesKindDto);
      return await this.categoriesKindRepository.save(categoriesKind);
    } catch (error) {
      throw new InternalServerErrorException('Error creating categories kind');
    }
  }

  async findAll() {
    try {
      return await this.categoriesKindRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching categories kind');
    }
  }

  async findOne(id: number) {
    try {
      const categoriesKind = await this.categoriesKindRepository.findOne({ where: { id } });
      if (!categoriesKind) {
        throw new NotFoundException('Categories kind not found');
      }
      return categoriesKind;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching categories kind');
    }
  }

  async update(id: number, updateCategoriesKindDto: UpdateCategoriesKindDto) {
    try {
      const categoriesKind = await this.findOne(id);
      Object.assign(categoriesKind, updateCategoriesKindDto);
      return await this.categoriesKindRepository.save(categoriesKind);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating categories kind');
    }
  }

  async remove(id: number) {
    try {
      const categoriesKind = await this.findOne(id);
      return await this.categoriesKindRepository.remove(categoriesKind);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting categories kind');
    }
  }
}
