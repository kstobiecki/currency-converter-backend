import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConverterModule } from './app/converter/converter.module';
import { AppLogger } from './app.logger';

@Module({
  imports: [ConverterModule],
  controllers: [AppController],
  providers: [AppService, AppLogger],
})
export class AppModule {}
