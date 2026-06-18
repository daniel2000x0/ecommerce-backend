import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const country = this.countryRepository.create(createCountryDto);
      return await this.countryRepository.save(country);
    } catch (error) {
      throw new InternalServerErrorException('Error creating country');
    }
  }

  async findAll() {
    try {
      return await this.countryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching countries');
    }
  }

  async findOne(id: number) {
    try {
      const country = await this.countryRepository.findOne({ where: { id } });
      if (!country) {
        throw new NotFoundException('Country not found');
      }
      return country;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching country');
    }
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      const country = await this.findOne(id);
      Object.assign(country, updateCountryDto);
      return await this.countryRepository.save(country);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating country');
    }
  }

  async remove(id: number) {
    try {
      const country = await this.findOne(id);
      return await this.countryRepository.remove(country);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting country');
    }
  }
}
