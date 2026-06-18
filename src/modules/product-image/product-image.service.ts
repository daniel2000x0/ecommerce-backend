import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    try {
      const productImage = this.productImageRepository.create(createProductImageDto);
      return await this.productImageRepository.save(productImage);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product image');
    }
  }

  async findAll() {
    try {
      return await this.productImageRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching product images');
    }
  }

  async findOne(id: number) {
    try {
      const productImage = await this.productImageRepository.findOne({ where: { id } });
      if (!productImage) {
        throw new NotFoundException('Product image not found');
      }
      return productImage;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching product image');
    }
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto) {
    try {
      const productImage = await this.findOne(id);
      Object.assign(productImage, updateProductImageDto);
      return await this.productImageRepository.save(productImage);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating product image');
    }
  }

  async remove(id: number) {
    try {
      const productImage = await this.findOne(id);
      return await this.productImageRepository.remove(productImage);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting product image');
    }
  }
}
