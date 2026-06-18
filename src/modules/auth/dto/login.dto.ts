import { Transform } from "class-transformer";
import { IsEmail, MaxLength ,IsString,length} from "class-validator";

export class LoginUserDto{
    @IsEmail()
    @MaxLength(100)
    useremail!:string;
    @IsString()
    @Transform(({value})=> value.trim())
    userpassword!:string;
}