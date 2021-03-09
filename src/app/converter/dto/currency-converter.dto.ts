import { IsNumber, IsNotEmpty } from 'class-validator';

export class CurrencyConverterDto {
  @IsNotEmpty()
  public from: string;

  @IsNotEmpty()
  public to: string;
  
  @IsNumber()
  public amount: number;

  public converted?: number;
  public conversion?: number;
  public date?: Date;
}
