import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesKindDto } from './create-categories-kind.dto';

export class UpdateCategoriesKindDto extends PartialType(CreateCategoriesKindDto) {}
