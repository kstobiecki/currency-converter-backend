import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { config } from './config';
import { ValidationPipe } from '@nestjs/common';
const oxr = require('open-exchange-rates');
const fx = require('money');

function setConversioRates() {
  oxr.set({ app_id: config.exchangeRatesApi.appId });
  oxr.latest(() => {
    fx.rates = oxr.rates;
	  fx.base = oxr.base;
  });
}

async function bootstrap() {
  const corsOptions = {
    allowedHeaders: ['Content-Type', 'Accept', 'Admin-authorization', 'Origin', 'User-agent',  'Authorization', 'Refer', 'x-axios-retry-count']
  };
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors(corsOptions));
  app.use(json({limit: '10mb'}));
  app.use(urlencoded({limit: '10mb', extended: true}));
  app.use(helmet());
  setConversioRates();

  await app.listen(9000);
}
bootstrap();
