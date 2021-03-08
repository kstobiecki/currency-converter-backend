import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { CurrencyConverterDto } from './dto/currency-converter.dto';
import { RequiredFieldsPipe } from '../helpers/pipes/required-fields.pipe';
import { AppLogger } from '../../app.logger';

@Controller('converter')
export class ConverterController {
  private readonly logger = new AppLogger(ConverterController.name);
  constructor(private readonly converterService: ConverterService) {}

  @Post()
  @HttpCode(HttpStatus.OK.valueOf())
  public async convertCurrency(@Body(new RequiredFieldsPipe(CurrencyConverterDto)) data: CurrencyConverterDto): Promise<CurrencyConverterDto> {
    this.logger.log(`[convertCurrency] Converting ${data.amount} ${data.from} to ${data.to}`);
    return this.converterService.convertCurrency(data);
  }
}
