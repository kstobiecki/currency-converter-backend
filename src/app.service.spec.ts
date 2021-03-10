import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService
      ]
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return hello string', async () => {
      expect(await appService.getHello()).toEqual('Hello World!');
    });
  });
});

