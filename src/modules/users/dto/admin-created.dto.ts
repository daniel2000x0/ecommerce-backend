import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class RegisterAdminDto {
  @IsInt()
  userid?: number;

  @IsString()
  @Length(1, 20)
  userfirstname!: string;

  @IsString()
  @Length(1, 20)
  userlastname!: string;

  @IsEmail()
  @MaxLength(100)
  useremail!: string;

  @IsString()
  @Length(6, 60)
  userpassword!: string;

  @IsDateString()
  userbirthdate!: Date;

  @IsInt()
  usergender!: number; // referencia a Gender

  @IsOptional()
  @IsBoolean()
  userstatus?: boolean;
}