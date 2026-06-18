import { Injectable, NotFoundException, Query, InternalServerErrorException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationDto } from '../../../common/dto/Pagination.dto';
import { getPagination } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const createdProduct: Product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(createdProduct);
    } catch (error) {
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10 } = paginationDto;
      const { skip, take } = getPagination(page, limit);

      const [products, total] = await this.productRepository.findAndCount({
        skip,
        take,
      });

      return {
        data: products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching products');
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['category', 'manufacture'],
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching product');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const updateProduct = await this.productRepository.findOne({
        where: { id },
      });

      if (!updateProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      Object.assign(updateProduct, updateProductDto);
      return await this.productRepository.save(updateProduct);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating product');
    }
  }

  async remove(id: number) {
    try {
      const product = await this.findOne(id);
      return await this.productRepository.remove(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting product');
    }
  }
}
