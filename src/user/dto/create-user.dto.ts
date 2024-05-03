import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  f_name:string;
  @IsString()
  @IsNotEmpty()
  l_name:string;
  @IsString()
  @IsNotEmpty()
  email:string;
  @IsNumber()
  @IsNotEmpty()
  age:number;

}
