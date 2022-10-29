import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// https://docs.nestjs.com/pipes#class-validator
// NOTE: return object, not value

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  private logger = new Logger(ValidationPipe.name)

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // this.logger.debug(`before ${JSON.stringify(value)}`)
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      this.logger.debug(`errors ${JSON.stringify(errors)}`)
      // throw new BadRequestException('Validation failed');
      throw new BadRequestException({ errors });
    }
    // this.logger.debug(`after ${JSON.stringify(object)}`)

    // return value;
    return object
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}