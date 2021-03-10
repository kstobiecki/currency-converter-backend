import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CurrencyConverterDto } from './dto';
import { AppLogger } from '../../app.logger';
const oxr = require('open-exchange-rates');
const fx = require('money');
const MS_HOUR = 3600000;

@Injectable()
export class ConverterService {
    private readonly logger = new AppLogger(ConverterService.name);
    private MS_HOUR = 3600000;

    public async convertCurrency({from, to, amount}: CurrencyConverterDto): Promise<CurrencyConverterDto> {
        try {
            this.checkConversioRates();
            const conversion = fx.convert(1, {from, to});
            const converted = fx.convert(amount, {from, to});
            return { from, to, amount, converted, date: new Date(), conversion };
        } catch (error) {
            this.logger.error(`[convertCurrencyError] Conversion error ${error}`);
            throw new HttpException(
                {
                  error,
                  message: 'Conversion error',
                }, 
                HttpStatus.BAD_REQUEST
              );
        }
    }

    private async checkConversioRates() {
        if (Date.now() - oxr.timestamp >= MS_HOUR) {
            oxr.latest(() => {
                fx.rates = oxr.rates;
                fx.base = oxr.base;
            });
        };
    }
}
