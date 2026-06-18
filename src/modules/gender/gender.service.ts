import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async create(createGenderDto: CreateGenderDto) {
    try {
      const gender = this.genderRepository.create(createGenderDto);
      return await this.genderRepository.save(gender);
    } catch (error) {
      throw new InternalServerErrorException('Error creating gender');
    }
  }

  async findAll() {
    try {
      return await this.genderRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching genders');
    }
  }

  async findOne(id: number) {
    try {
      const gender = await this.genderRepository.findOne({ where: { id } });
      if (!gender) {
        throw new NotFoundException('Gender not found');
      }
      return gender;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error fetching gender');
    }
  }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    try {
      const gender = await this.findOne(id);
      Object.assign(gender, updateGenderDto);
      return await this.genderRepository.save(gender);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error updating gender');
    }
  }

  async remove(id: number) {
    try {
      const gender = await this.findOne(id);
      return await this.genderRepository.remove(gender);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error deleting gender');
    }
  }
}
