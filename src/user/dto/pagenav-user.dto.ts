import { IsNumber } from "class-validator";

export class PagenavitonDto{
  
 @IsNumber()
  page:number=0;
 @IsNumber()
  limited:number=3;
}