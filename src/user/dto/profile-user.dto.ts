import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProfileUserDto {
  @IsString()
  @IsNotEmpty()
  bio:string;
  @IsString()
  @IsNotEmpty()
  photo:string;
  @IsNumber()
  userId:number
}