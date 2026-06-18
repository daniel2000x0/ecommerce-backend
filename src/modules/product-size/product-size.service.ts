import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductSizeDto } from './dto/create-product-size.dto';
import { UpdateProductSizeDto } from './dto/update-product-size.dto';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(createProductSizeDto: CreateProductSizeDto) {
    try {
      const productSize = this.productSizeRepository.create(createProductSizeDto);
      return await this.productSizeRepository.save(productSize);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product size');
    }
  }

  async findAll() {
    try {
      return await this.productSizeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product sizes');
    }
  }

  async findOne(id: number) {
    try {
      const productSize = await this.productSizeRepository.findOne({ where: { id } });
      if (!productSize) {
        throw new NotFoundException('Product size not found');
      }
      return productSize;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching product size');
    }
  }

  async update(id: number, updateProductSizeDto: UpdateProductSizeDto) {
    try {
      const productSize = await this.findOne(id);
      Object.assign(productSize, updateProductSizeDto);
      return await this.productSizeRepository.save(productSize);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating product size');
    }
  }

  async remove(id: number) {
    try {
      const productSize = await this.findOne(id);
      return await this.productSizeRepository.remove(productSize);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting product size');
    }
  }
}
