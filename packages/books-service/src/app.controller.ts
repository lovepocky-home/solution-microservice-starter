import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return { hello: this.appService.getHello() };
  }

  @Get('/callback')
  callback() {
    this.logger.debug(`callback`)
    return { callback: 1 }
  }
}
