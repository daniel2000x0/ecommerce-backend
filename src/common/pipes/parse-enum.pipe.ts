import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class  ParseEnumPipe <T extends Record<string, string | number>> implements PipeTransform<string | number, T[keyof T]>{
    constructor(private readonly enumType: T){}
    transform(value: string | number, metadata: ArgumentMetadata): T[keyof T] {
        const enumValues = Object.values(this.enumType);
        if(enumValues.includes(value)){
            return value as T[keyof T];
        }
        throw new Error(`Validation failed. "${value}" is not a valid enum value`);
    }
}