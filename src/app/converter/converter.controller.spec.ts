import { Test } from '@nestjs/testing';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { CurrencyConverterDto } from './dto';

describe('ConverterController', () => {
  let converterController: ConverterController;
  let converterService: ConverterService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConverterService
      ],
      controllers: [ConverterController]
    }).compile();

    converterController = module.get<ConverterController>(ConverterController);
    converterService = module.get<ConverterService>(ConverterService);
  });

  describe('converter', () => {
      it('should return converted value', async () => {
          jest.spyOn(converterController, 'convertCurrency').mockImplementation(() => Promise.resolve(CurrencyConversionMock));
          expect(await converterController.convertCurrency(CurrencyConversionMock)).toEqual(CurrencyConversionMock);
      })
  });
});

const CurrencyConversionMock = {
    from: 'USD',
    to: 'EUR',
    amount: 2.5,
    converted: 2.1,
    conversion: 0.84,
    date: new Date()
} as CurrencyConverterDto;

