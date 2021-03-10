import { Test } from '@nestjs/testing';
import { ConverterService } from './converter.service';
import { CurrencyConverterDto } from './dto';
import MockDate from 'mockdate';

jest.mock('open-exchange-rates');
jest.mock('money');
const oxr = require('open-exchange-rates');
const fx = require('money');

describe('ConverterService', () => {
    const MS_HOUR = 3600000;
    let converterService: ConverterService;
    beforeEach(async() => {
        const module = await Test.createTestingModule({
        providers: [
            ConverterService
        ]
        }).compile();

        converterService = module.get<ConverterService>(ConverterService);
    });

    describe('converter', () => {
        it('should convert currency', async () => {
            const date = new Date();
            MockDate.set(date)

            fx.convert = jest.fn(() => 1);
            oxr.timestamp = Date.now();

            const result = await converterService.convertCurrency(CurrencyConversionMock);

            expect(fx.convert).toBeCalledTimes(2);
            expect(fx.convert).toHaveBeenNthCalledWith(1, 1, {from: 'USD', 'to': 'EUR'});
            expect(fx.convert).toHaveBeenNthCalledWith(2, 2.5, {from: 'USD', 'to': 'EUR'});
            expect(result).toEqual({
                ...CurrencyConversionMock,
                date
            });

            MockDate.reset();
        });

        it('should update currency rates hour later', async () => {
            const date = new Date();
            MockDate.set(date)

            fx.convert = jest.fn(() => 1);
            oxr.latest = jest.fn(() => {});
            oxr.timestamp = Date.now() - MS_HOUR;

            await converterService.convertCurrency(CurrencyConversionMock);
            expect(oxr.latest).toBeCalledTimes(1);
            
            MockDate.reset();
        });

        it('should not update currency rates before one hour', async () => {
            const date = new Date();
            MockDate.set(date)

            fx.convert = jest.fn(() => 1);
            oxr.latest = jest.fn(() => {});
            oxr.timestamp = Date.now() - MS_HOUR + 1;

            await converterService.convertCurrency(CurrencyConversionMock);
            expect(oxr.latest).toBeCalledTimes(0);
            
            MockDate.reset();
        });
    });
});

const CurrencyConversionMock = {
    from: 'USD',
    to: 'EUR',
    amount: 2.5,
    converted: 1,
    conversion: 1
} as CurrencyConverterDto;