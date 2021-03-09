import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CurrencyConverterDto } from './dto/currency-converter.dto';
import { config } from '../../config/index';
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
            const conversion = fx(1).from(from).to(to)
            const converted = fx(amount).from(from).to(to);
            return { from, to, amount, converted, date: new Date(), conversion };
        } catch (error) {
            this.logger.error(`[convertCurrencyError] Conversion error`);
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
