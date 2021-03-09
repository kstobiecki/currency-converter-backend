import {Expose} from 'class-transformer';

export class CurrencyConverterDto {
  @Expose()
  public from: string;

  @Expose()
  public to: string;
  
  @Expose()
  public amount: number;

  public converted?: number;
  public conversion?: number;
  public date?: Date;
}
