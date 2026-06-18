import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';

@Injectable()
export class ManufacturesService {
  constructor(
    @InjectRepository(Manufacture)
    private readonly manufactureRepository: Repository<Manufacture>,
  ) {}

  async create(createManufactureDto: CreateManufactureDto) {
    try {
      const manufacture = this.manufactureRepository.create(createManufactureDto);
      return await this.manufactureRepository.save(manufacture);
    } catch (error) {
      throw new InternalServerErrorException('Error creating manufacture');
    }
  }

  async findAll() {
    try {
      return await this.manufactureRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching manufactures');
    }
  }

  async findOne(id: number) {
    try {
      const manufacture = await this.manufactureRepository.findOne({ where: { id } });
      if (!manufacture) {
        throw new NotFoundException('Manufacture not found');
      }
      return manufacture;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching manufacture');
    }
  }

  async update(id: number, updateManufactureDto: UpdateManufactureDto) {
    try {
      const manufacture = await this.findOne(id);
      Object.assign(manufacture, updateManufactureDto);
      return await this.manufactureRepository.save(manufacture);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating manufacture');
    }
  }

  async remove(id: number) {
    try {
      const manufacture = await this.findOne(id);
      return await this.manufactureRepository.remove(manufacture);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting manufacture');
    }
  }
}
