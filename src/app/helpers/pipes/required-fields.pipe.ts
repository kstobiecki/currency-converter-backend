import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform
  } from '@nestjs/common';
  import { ClassConstructor } from 'class-transformer/types/interfaces';
  import { plainToClass } from 'class-transformer';
  import { AppLogger } from '../../../app.logger'
  
  const get = require('lodash.get');
  
  @Injectable()
  export class RequiredFieldsPipe<T> implements PipeTransform<T>{
    constructor(private readonly model: ClassConstructor<T>) {}
  
    async transform(data: T, metatype: ArgumentMetadata): Promise<T> {
      if (!data) {
        throw new HttpException(
          {
            message: 'Bad request'
          },
          HttpStatus.BAD_REQUEST
        );
      }
      const missingFields = [];
      const dataDto: T = plainToClass(this.model, data);
      Object.keys(dataDto).forEach(key => dataDto[key] === undefined && missingFields.push(key));
      if (missingFields.length) {
        throw new HttpException(
          {
            message: 'Bad request',
            error: `Missing fields: ${missingFields.join(', ')}`
          },
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }
      return dataDto;
    }
  }
  