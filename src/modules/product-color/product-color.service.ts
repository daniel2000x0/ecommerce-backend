import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductColorDto } from './dto/create-product-color.dto';
import { UpdateProductColorDto } from './dto/update-product-color.dto';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColor)
    private readonly productColorRepository: Repository<ProductColor>,
  ) {}

  async create(createProductColorDto: CreateProductColorDto) {
    try {
      const productColor = this.productColorRepository.create(createProductColorDto);
      return await this.productColorRepository.save(productColor);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product color');
    }
  }

  async findAll() {
    try {
      return await this.productColorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product colors');
    }
  }

  async findOne(id: number) {
    try {
      const productColor = await this.productColorRepository.findOne({ where: { id } });
      if (!productColor) {
        throw new NotFoundException('Product color not found');
      }
      return productColor;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching product color');
    }
  }

  async update(id: number, updateProductColorDto: UpdateProductColorDto) {
    try {
      const productColor = await this.findOne(id);
      Object.assign(productColor, updateProductColorDto);
      return await this.productColorRepository.save(productColor);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating product color');
    }
  }

  async remove(id: number) {
    try {
      const productColor = await this.findOne(id);
      return await this.productColorRepository.remove(productColor);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting product color');
    }
  }
}
