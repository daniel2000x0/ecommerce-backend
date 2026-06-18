import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
@Injectable()
export class CustomerService {

    constructor (
      @InjectRepository(Customer)
      private readonly customerRepository :Repository<Customer>,
    ){}

    async register(createCustomerDto:  CreateCustomerDto ):Promise<{ message: string; customer: Customer }>{
      try {
         const hashedpassword =  await bcrypt.hash(createCustomerDto.password,10);
       const validation = await this.customerRepository.findOne({where :
        { email:createCustomerDto.email}
 
});

if(validation){
  throw new ConflictException('Email already in use')
}


 const  customer =  this.customerRepository.create(
  {
     email: createCustomerDto.email,
  password: hashedpassword,
  firstname: createCustomerDto.firstName,
  lastname: createCustomerDto.lastName,
  birthdate: new Date(createCustomerDto.birthDate),
  gender: { genderid: createCustomerDto.genderId },
  }
 );
  const data = await  this.customerRepository.save(customer);
   return {message:'data sucess', customer:data}
      } catch (error: unknown) {
        console.error('Error al crear usuario:', error);

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as any).code === '23505'
  ) {
    throw new ConflictException(
      `El correo "${createCustomerDto.email}" ya está registrado`,
    );
  }

  if (error instanceof Error) {
    throw new InternalServerErrorException(error.message);
  }

  throw new InternalServerErrorException('No se pudo crear el usuario'); 
      }
    }
  async create(createCustomerDto: CreateCustomerDto) {
    const newcustomer =   await this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(newcustomer);
  }

  findAll() {
    return `This action returns all customer`;
  }

async findOne(customerid: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerid },
      relations: ['shoppingCarts'],
    });
    if (!customer)
      throw new NotFoundException(`Customer #${customerid} not found`);
    return customer;
  }
async findemail(custommeremail: string): Promise<Customer> {
  const customer = await this.customerRepository.findOne({
    where: { email: custommeremail , isVerified:true},
  });

  if (!customer) {
    throw new NotFoundException('No se ha encontrado el usuario');
  }

  return customer;
}
 async   update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({
      id: id,
      ...updateCustomerDto,
    });
      if (!customer) {
        throw new NotFoundException(`Customer #${id} not found`);
      }
      const updatedCustomer = await this.customerRepository.save(customer,);
    return updatedCustomer;
  }
 

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
