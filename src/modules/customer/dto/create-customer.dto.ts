import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(60)
  password!: string;

  @IsString()
  @MaxLength(20)
  firstName!: string;

  @IsString()
  @MaxLength(20)
  lastName!: string;

  @IsDateString()
  birthDate!: string;

  @IsInt()
  genderId!: number;
  @IsBoolean()

  isVerified: boolean= false;
}