import { PartialType } from '@nestjs/mapped-types';
import { CreateManufactureDto } from './create-manufacture.dto';

export class UpdateManufactureDto extends PartialType(CreateManufactureDto) {}
