import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TrimPipe implements PipeTransform<string,string>{
    transform(value: string, metadata: ArgumentMetadata): string {
        if(typeof value === 'string'){
            return value.trim();
        }
        throw new Error(`Validation failed. "${value}" is not a string`);
    }
}
