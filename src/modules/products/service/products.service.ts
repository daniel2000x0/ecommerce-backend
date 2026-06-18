import { Injectable, NotFoundException, Query } from '@nestjs/common';

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
    const createdproduc: Product = this.productRepository.create(createProductDto);

    // Guardar en la base de datos
    return await this.productRepository.save(createdproduc);
  }

  findAll(@Query() paginationDto: PaginationDto) {
    const {page=1, limit=10 }= paginationDto;
    const {skip, take} = getPagination(page,limit);

    return this.productRepository.find(
      {
        skip: skip,
        take: take,
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(vaid: number, updateProductDto: UpdateProductDto) {
    const updateproduct = await this.productRepository.findOne({
      where: { id: vaid },
    });
    if (!updateproduct) {
      throw new NotFoundException(`Usuario con id ${vaid} no encontrado`);
    }
    Object.assign(updateproduct, updateProductDto);
    return await this.productRepository.save(updateproduct);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
