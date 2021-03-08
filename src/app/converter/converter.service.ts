import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CurrencyConverterDto } from './dto/currency-converter.dto';
import { config } from '../../config/index';
import { AppLogger } from '../../app.logger';

@Injectable()
export class ConverterService {
    private readonly logger = new AppLogger(ConverterService.name);

    public async convertCurrency({from, to, amount}: CurrencyConverterDto): Promise<CurrencyConverterDto> {
        try {
            const params = { 
                q: `${from}_${to}`,
                compact: 'ultra',
                apiKey: config.currConv.apiKey
            }
            const result: { data: { [x: string]: number} } = await axios.get(config.currConv.url, { params })
            console.log(result.data[params.q]);
            const converted = amount * result.data[params.q];
            return { from, to, amount, converted };
        } catch (error) {
            this.logger.error(`[convertCurrencyError] CurrConv api response error`);
            throw new HttpException(
                {
                  error,
                  message: 'CurrConv api request error',
                }, 
                HttpStatus.BAD_REQUEST
              );
        }
    }
}
